import { NextResponse } from "next/server";
import { Vehicle, VehicleBrand, VehicleModel } from "@/services/backend/models/associations";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const vehicles = await Vehicle.findAll({ 
            where: { clientId: id },
            include: [
                { model: VehicleModel, as: 'Model' },
                { model: VehicleBrand, as: 'Brand' }
            ]
        });
        return NextResponse.json(vehicles);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting client vehicles' }, { status: 500 });
    }
}


