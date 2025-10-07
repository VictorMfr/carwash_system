import { VehicleModel } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create model
export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const isModelInDB = await VehicleModel.findOne({ where: { name }, paranoid: false });
        if (isModelInDB) {
            if (isModelInDB.isSoftDeleted()) {
                await isModelInDB.restore();
                return NextResponse.json(isModelInDB);
            } else {
                return NextResponse.json({ error: 'Model already exists' }, { status: 400 });
            }
        }

        const model = await VehicleModel.create({ name });
        return NextResponse.json(model);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating model' }, { status: 500 });
    }
}

// Get models
export async function GET() {
    try {
        const models = await VehicleModel.findAll();
        return NextResponse.json(models);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting models' }, { status: 500 });
    }
}

// Delete multiple models
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No model IDs provided' }, { status: 400 });
        }
        const deletedCount = await VehicleModel.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} models deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting models' }, { status: 500 });
    }
}

