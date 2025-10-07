import { Service, Recipe, Operator, Vehicle, StockDetails } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";

// Create service
export async function POST(request: Request) {
    try {
        const { date, recipeId, operatorIds, vehicleId, stockDetailIds } = await request.json();

        // Validate required fields
        if (!date || !recipeId || !vehicleId) {
            return NextResponse.json({ error: 'Date, recipe, and vehicle are required' }, { status: 400 });
        }

        // Check if recipe exists
        const recipe = await Recipe.findByPk(recipeId);
        if (!recipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        // Check if vehicle exists
        const vehicle = await Vehicle.findByPk(vehicleId);
        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
        }

        // Create service
        const service = await Service.create({ date: new Date(date) });

        // Associate recipe
        await service.setRecipe(recipe);

        // Associate vehicle
        await service.setVehicle(vehicle);

        // Associate operators if provided
        if (operatorIds && operatorIds.length > 0) {
            const operators = await Operator.findAll({
                where: { id: operatorIds }
            });
            if (operators.length !== operatorIds.length) {
                return NextResponse.json({ error: 'One or more operators not found' }, { status: 404 });
            }
            await service.setOperators(operators);
        }

        // Associate stock details if provided
        if (stockDetailIds && stockDetailIds.length > 0) {
            const stockDetails = await StockDetails.findAll({
                where: { id: stockDetailIds }
            });
            if (stockDetails.length !== stockDetailIds.length) {
                return NextResponse.json({ error: 'One or more stock details not found' }, { status: 404 });
            }
            await service.setStockDetails(stockDetails);
        }

        // Return service with associations
        const serviceWithAssociations = await Service.findByPk(service.id, {
            include: [Recipe, Operator, Vehicle, StockDetails]
        });

        return NextResponse.json(serviceWithAssociations);
    } catch (error) {
        return handleServerError(error);
    }
}

// Get services
export async function GET() {
    try {
        const services = await Service.findAll({
            include: [Recipe, Operator, Vehicle, StockDetails],
            order: [['created_at', 'DESC']]
        });

        // Transform the data to include direct fields
        const transformedServices = services.map(service => ({
            ...service.toJSON(),
            recipeName: service.Recipe?.name || null,
            vehicleLicensePlate: service.Vehicle?.license_plate || null,
            operators: service.Operators?.map(op => ({
                id: op.id,
                name: op.name,
                lastname: op.lastname
            })) || []
        }));

        return NextResponse.json(transformedServices);
    } catch (error) {
        return handleServerError(error);
    }
}
