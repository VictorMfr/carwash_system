import { VehicleBrand } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get vehicle brand by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const brand = await VehicleBrand.findByPk(id);
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting brand' }, { status: 500 });
    }
}

// Update vehicle brand
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name } = await request.json();

        const brand = await VehicleBrand.findByPk(id);
        if (!brand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }

        await brand.update({ name });
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating brand' }, { status: 500 });
    }
}

// Delete vehicle brand
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const brand = await VehicleBrand.findByPk(id);
        if (!brand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }
        await brand.destroy();
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting brand' }, { status: 500 });
    }
}

