import { Operator } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get operator by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const operator = await Operator.findByPk(id);
        return NextResponse.json(operator);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting operator' }, { status: 500 });
    }
}

// Update operator
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name, lastname, phone, address, avatar } = await request.json();

        const operator = await Operator.findByPk(id);
        if (!operator) {
            return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
        }

        await operator.update({ name, lastname, phone, address, avatar });
        return NextResponse.json(operator);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating operator' }, { status: 500 });
    }
}

// Delete operator
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const operator = await Operator.findByPk(id);
        if (!operator) {
            return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
        }
        await operator.destroy();
        return NextResponse.json(operator);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting operator' }, { status: 500 });
    }
}

