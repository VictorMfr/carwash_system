import { Vehicle, VehicleBrand, VehicleModel } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create vehicle
export async function POST(request: Request) {
    try {
        const { license_plate } = await request.json();

        const isVehicleInDB = await Vehicle.findOne({ where: { license_plate }, paranoid: false });
        if (isVehicleInDB) {
            if (isVehicleInDB.isSoftDeleted()) {
                await isVehicleInDB.restore();
                return NextResponse.json(isVehicleInDB);
            } else {
                return NextResponse.json({ error: 'Vehicle already exists' }, { status: 400 });
            }
        }

        const vehicle = await Vehicle.create({ license_plate });
        return NextResponse.json(vehicle);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating vehicle' }, { status: 500 });
    }
}

// Get vehicles
export async function GET() {
    try {
        const vehicles = await Vehicle.findAll({
            include: [
                { model: VehicleModel, as: 'Model' },
                { model: VehicleBrand, as: 'Brand' }
            ]
        });
        return NextResponse.json(vehicles);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting vehicles' }, { status: 500 });
    }
}

// Delete multiple vehicles
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No vehicle IDs provided' }, { status: 400 });
        }
        const deletedCount = await Vehicle.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} vehicles deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting vehicles' }, { status: 500 });
    }
}

