import { Type } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create type
export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const isTypeInDB = await Type.findOne({ where: { name }, paranoid: false });
        if (isTypeInDB) {
            if (isTypeInDB.isSoftDeleted()) {
                await isTypeInDB.restore();
                return NextResponse.json(isTypeInDB);
            } else {
                return NextResponse.json({ error: 'Type already exists' }, { status: 400 });
            }
        }

        const type = await Type.create({ name });
        return NextResponse.json(type);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating type' }, { status: 500 });
    }
}

// Get types
export async function GET() {
    try {
        const types = await Type.findAll();
        return NextResponse.json(types);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting types' }, { status: 500 });
    }
}

// Delete multiple types
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No type IDs provided' }, { status: 400 });
        }
        const deletedCount = await Type.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} types deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting types' }, { status: 500 });
    }
}

