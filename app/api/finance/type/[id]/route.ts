import { Type } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get type by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const type = await Type.findByPk(id);
        return NextResponse.json(type);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting type' }, { status: 500 });
    }
}

// Update type
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name } = await request.json();

        const type = await Type.findByPk(id);
        if (!type) {
            return NextResponse.json({ error: 'Type not found' }, { status: 404 });
        }

        await type.update({ name });
        return NextResponse.json(type);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating type' }, { status: 500 });
    }
}

// Delete type
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const type = await Type.findByPk(id);
        if (!type) {
            return NextResponse.json({ error: 'Type not found' }, { status: 404 });
        }
        await type.destroy();
        return NextResponse.json(type);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting type' }, { status: 500 });
    }
}

