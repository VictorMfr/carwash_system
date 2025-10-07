import { Operator } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create operator
export async function POST(request: Request) {
    try {
        const { name, lastname, phone, address, avatar } = await request.json();

        const isOperatorInDB = await Operator.findOne({ where: { phone }, paranoid: false });
        if (isOperatorInDB) {
            if (isOperatorInDB.isSoftDeleted()) {
                await isOperatorInDB.restore();
                return NextResponse.json(isOperatorInDB);
            } else {
                return NextResponse.json({ error: 'Operator already exists' }, { status: 400 });
            }
        }

        const operator = await Operator.create({ name, lastname, phone, address, avatar });
        return NextResponse.json(operator);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating operator' }, { status: 500 });
    }
}

// Get operators
export async function GET() {
    try {
        const operators = await Operator.findAll();
        return NextResponse.json(operators);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting operators' }, { status: 500 });
    }
}

// Delete multiple operators
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No operator IDs provided' }, { status: 400 });
        }
        const deletedCount = await Operator.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} operators deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting operators' }, { status: 500 });
    }
}

