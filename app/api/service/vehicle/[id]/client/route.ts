import { NextResponse } from "next/server";
import { Client, Vehicle } from "@/services/backend/models/associations";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const vehicle = await Vehicle.findByPk(id, {
            include: [{ model: Client, as: 'Client' }]
        });

        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
        }

        return NextResponse.json((vehicle as any).Client || null);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting vehicle client' }, { status: 500 });
    }
}


