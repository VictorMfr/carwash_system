import { VehicleModel } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get model by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const model = await VehicleModel.findByPk(id);
        return NextResponse.json(model);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting model' }, { status: 500 });
    }
}

// Update model
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name } = await request.json();

        const model = await VehicleModel.findByPk(id);
        if (!model) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        await model.update({ name });
        return NextResponse.json(model);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating model' }, { status: 500 });
    }
}

// Delete model
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const model = await VehicleModel.findByPk(id);
        if (!model) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }
        await model.destroy();
        return NextResponse.json(model);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting model' }, { status: 500 });
    }
}

