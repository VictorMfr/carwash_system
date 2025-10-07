import { Method } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create method
export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const isMethodInDB = await Method.findOne({ where: { name }, paranoid: false });
        if (isMethodInDB) {
            if (isMethodInDB.isSoftDeleted()) {
                await isMethodInDB.restore();
                return NextResponse.json(isMethodInDB);
            } else {
                return NextResponse.json({ error: 'Method already exists' }, { status: 400 });
            }
        }

        const method = await Method.create({ name });
        return NextResponse.json(method);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating method' }, { status: 500 });
    }
}

// Get methods
export async function GET() {
    try {
        const methods = await Method.findAll();
        return NextResponse.json(methods);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting methods' }, { status: 500 });
    }
}

// Delete multiple methods
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No method IDs provided' }, { status: 400 });
        }
        const deletedCount = await Method.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} methods deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting methods' }, { status: 500 });
    }
}

