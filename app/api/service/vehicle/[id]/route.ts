import { Vehicle } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get vehicle by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const vehicle = await Vehicle.findByPk(id);
        return NextResponse.json(vehicle);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting vehicle' }, { status: 500 });
    }
}

// Update vehicle
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { license_plate } = await request.json();

        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
        }

        await vehicle.update({ license_plate });
        return NextResponse.json(vehicle);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating vehicle' }, { status: 500 });
    }
}

// Delete vehicle
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
        }
        await vehicle.destroy();
        return NextResponse.json(vehicle);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting vehicle' }, { status: 500 });
    }
}

