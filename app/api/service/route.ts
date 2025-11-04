import { Service, Recipe, Operator, Vehicle, StockDetails, Client, Stock, Product } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import RecipeStockDetails from "@/services/backend/models/service/recipeStockDetails";
import ServiceStockDetails from "@/services/backend/models/service/serviceStockDetails";

const createService = async (body: any) => {
    const formmatedDated = body.date.split('-');
    const formattedDate = new Date(Number(formmatedDated[2]), Number(formmatedDated[1]) - 1, Number(formmatedDated[0]));

    const service = await Service.create({
        date: formattedDate,
        bol_charge: body.bol_charge ? body.bol_charge : body.dollar_charge * body.dollar_rate,
        dollar_rate: body.dollar_rate,
        status: body.status
    });

    return service;
}

const setServiceAssociations = async (service: Service, body: any) => {
    await service.setRecipe(body.recipeName.id);
    await service.setOperators(body.operators.map((operator: any) => operator.id));
    await service.setVehicle(body.vehicleLicensePlate.id);

    return service;
}

// app/api/service/route.ts
const setRecipeStockDetails = async (service: Service, body: any) => {
	const recipe = await Recipe.findByPk(body.recipeName.id);
	const cart = body.recipeName.cart || [];

	if (!recipe) {
		throw new Error('Recipe not found');
	}

	// Elimina TODAS las filas actuales del puente (paranoid => force: true)
	await RecipeStockDetails.destroy({ where: { recipeId: recipe.id }, force: true });

	// Recrea todo con IDs y cantidades normalizados
	if (cart.length) {
		const payload = cart.map((item: any) => {
			const stockDetailId =
				item?.product?.id ??     // formato desde /api/stock/details
				item?.StockDetails?.id ??// formato desde la última config de receta
				item?.stockDetailId;     // fallback

			const quantity = Number(
				item?.quantity ??         // formato del carrito
				item?.through?.quantity   // por si vino embebido
			);

			return {
				recipeId: recipe.id,
				stockDetailId,
				quantity
			};
		})
		// valida datos
		.filter((r: any) => r.stockDetailId && Number.isFinite(r.quantity) && r.quantity > 0);

		if (payload.length) {
			await RecipeStockDetails.bulkCreate(payload);
		}
	}

	return recipe;
}

const setOperators = async (service: Service, body: any) => {
    await service.setOperators(body.operators.map((operator: any) => operator.id));
    return service;
}

const setServiceStockDetails = async (service: Service, body: any) => {
    if (Array.isArray(body.recipeName.cart) && body.recipeName.cart.length > 0) {
        const payload = body.recipeName.cart.map((stockDetail: any) => ({
            serviceId: service.id,
            stockDetailId: stockDetail.product.id,
            quantity: stockDetail.product.quantity,
        }));
        await ServiceStockDetails.bulkCreate(payload);
    }

    return service;
}

// Create service
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        console.log(body);

        const service = await createService(body);
        await setServiceAssociations(service, body);
        await setRecipeStockDetails(service, body);
        await setOperators(service, body);
        await setServiceStockDetails(service, body);

        const dollarCharge = service.dollar_rate ? Number(service.bol_charge) / Number(service.dollar_rate) : null;
        const client = await Client.findByPk(body.vehicleLicensePlate.clientId);
        
        const reponse = {
            ...service.toJSON(),
            dollar_charge: dollarCharge,
            recipeName: body.recipeName.name,
            client: `${client?.name} ${client?.lastname}`,
            vehicleLicensePlate: body.vehicleLicensePlate.license_plate,
            operators: body.operators,
        }

        return NextResponse.json(reponse);

    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}

// Get services
export async function GET() {
    try {
        const services = await Service.findAll({
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Operator, as: 'Operators' },
                { model: Vehicle, as: 'Vehicle', include: [{ model: Client, as: 'Client' }] },
                {
                    model: StockDetails,
                    as: 'StockDetails',
                    include: [
                        {
                            model: Stock,
                            as: 'Stock',
                            include: [{ model: Product, as: 'Product' }]
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        // Transform the data to include direct fields
        const transformedServices = services.map(service => {
            const json = service.toJSON() as any;
            const extras = (json.StockDetails ?? []).map((sd: any) => ({
                id: sd.id,
                productId: sd.Stock?.Product?.id ?? null,
                product: sd.Stock?.Product?.name ?? null,
                quantity: sd.quantity,
                entry_date: sd.entry_date
            }));

            return {
                ...json,
                recipeName: service.Recipe?.name,
                dollar_rate: service.dollar_rate,
                bol_charge: service.bol_charge,
                // Derive dollar_charge for the client (read-only)
                dollar_charge: service.dollar_rate ? Number(service.bol_charge) / Number(service.dollar_rate) : null,
                status: service.status,
                vehicleLicensePlate: service.Vehicle?.license_plate,
                client: `${service.Vehicle?.Client?.name} ${service.Vehicle?.Client?.lastname}`,
                operators: service.Operators?.map(op => ({
                    id: op.id,
                    name: op.name,
                    lastname: op.lastname
                })) || [],
                extras
            };
        });

        return NextResponse.json(transformedServices);
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}
