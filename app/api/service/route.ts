import { Service, Recipe, Operator, Vehicle, StockDetails, Client } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";

// Create service
export async function POST(request: Request) {
    try {
        const { date, recipeName, vehicleLicensePlate, operators, dollar_rate, dollar_charge, bol_charge, status } = await request.json();

        const formattedDate = date.split('-');
        const parsedDate = new Date(formattedDate[2], formattedDate[1] - 1, formattedDate[0]);

        // Rule: if user enters dollar_charge, compute bol_charge using dollar_rate.
        // Otherwise, use bol_charge as provided. Persist amount in bolívares.
        const parsedDollarRate = Number(dollar_rate ?? 0);
        const hasDollarCharge = dollar_charge !== undefined && dollar_charge !== null && dollar_charge !== '';
        const computedBolCharge = hasDollarCharge
            ? Number(dollar_charge) * parsedDollarRate
            : Number(bol_charge ?? 0);
        const amount = computedBolCharge;

        const createAttrs: any = { date: parsedDate, amount, dollar_rate: parsedDollarRate, bol_charge: computedBolCharge, status };

        const service = await Service.create(createAttrs);
        await service.setRecipe(recipeName.id);
        await service.setVehicle(vehicleLicensePlate.id);
        await service.setOperators(operators.map((op: any) => op.id));
        return NextResponse.json({
            id: service.id,
            date: service.date,
            recipeName: recipeName.name || null,
            vehicleLicensePlate: vehicleLicensePlate.license_plate || null,
            amount: service.amount,
            dollar_rate: service.dollar_rate,
            bol_charge: service.bol_charge,
            // Expose dollar_charge derived for the client convenience
            dollar_charge: parsedDollarRate ? Number(service.bol_charge) / parsedDollarRate : null,
            status: service.status,
            operators: operators.map((op: any) => ({
                id: op.id,
                name: op.name,
                lastname: op.lastname || ''
            })) || []
        });
    } catch (error) {
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
                { model: StockDetails, as: 'ServiceStockDetails' }
            ],
            order: [['created_at', 'DESC']]
        });

        // Transform the data to include direct fields
        const transformedServices = services.map(service => ({
            ...service.toJSON(),
            recipeName: service.Recipe.name,
            amount: service.amount,
            dollar_rate: service.dollar_rate,
            bol_charge: service.bol_charge,
            // Derive dollar_charge for the client (read-only)
            dollar_charge: service.dollar_rate ? Number(service.bol_charge) / Number(service.dollar_rate) : null,
            status: service.status,
            vehicleLicensePlate: service.Vehicle.license_plate,
            client: `${service.Vehicle.Client.name} ${service.Vehicle.Client.lastname}`,
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
