import { Service, Recipe, Operator, Vehicle, StockDetails } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";

// Get service by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const service = await Service.findByPk(id, {
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Operator, as: 'Operators' },
                { model: Vehicle, as: 'Vehicle' },
                { model: StockDetails, as: 'ServiceStockDetails' }
            ]
        });

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        return handleServerError(error);
    }
}

// Update service
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { date, recipeId, operatorIds, vehicleId, stockDetailIds } = await request.json();

        const service = await Service.findByPk(id);
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        // Update basic fields
        if (date) {
            await service.update({ date: new Date(date) });
        }

        // Update recipe if provided
        if (recipeId) {
            const recipe = await Recipe.findByPk(recipeId);
            if (!recipe) {
                return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
            }
            await service.setRecipe(recipe);
        }

        // Update vehicle if provided
        if (vehicleId) {
            const vehicle = await Vehicle.findByPk(vehicleId);
            if (!vehicle) {
                return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
            }
            await service.setVehicle(vehicle);
        }

        // Update operators if provided
        if (operatorIds !== undefined) {
            if (operatorIds.length > 0) {
                const operators = await Operator.findAll({
                    where: { id: operatorIds }
                });
                if (operators.length !== operatorIds.length) {
                    return NextResponse.json({ error: 'One or more operators not found' }, { status: 404 });
                }
                await service.setOperators(operators);
            } else {
                await service.setOperators([]);
            }
        }

        // Update stock details if provided
        if (stockDetailIds !== undefined) {
            if (stockDetailIds.length > 0) {
                const stockDetails = await StockDetails.findAll({
                    where: { id: stockDetailIds }
                });
                if (stockDetails.length !== stockDetailIds.length) {
                    return NextResponse.json({ error: 'One or more stock details not found' }, { status: 404 });
                }
                await service.setStockDetails(stockDetails);
            } else {
                await service.setStockDetails([]);
            }
        }

        // Return updated service with associations
        const updatedService = await Service.findByPk(id, {
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Operator, as: 'Operators' },
                { model: Vehicle, as: 'Vehicle' },
                { model: StockDetails, as: 'ServiceStockDetails' }
            ]
        });

        return NextResponse.json(updatedService);
    } catch (error) {
        return handleServerError(error);
    }
}

// Delete service
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const service = await Service.findByPk(id);

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        await service.destroy();
        return NextResponse.json({ success: true });
    } catch (error) {
        return handleServerError(error);
    }
}
