import { Method } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get method by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const method = await Method.findByPk(id);
        return NextResponse.json(method);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting method' }, { status: 500 });
    }
}

// Update method
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name } = await request.json();

        const method = await Method.findByPk(id);
        if (!method) {
            return NextResponse.json({ error: 'Method not found' }, { status: 404 });
        }

        await method.update({ name });
        return NextResponse.json(method);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating method' }, { status: 500 });
    }
}

// Delete method
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const method = await Method.findByPk(id);
        if (!method) {
            return NextResponse.json({ error: 'Method not found' }, { status: 404 });
        }
        await method.destroy();
        return NextResponse.json(method);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting method' }, { status: 500 });
    }
}

