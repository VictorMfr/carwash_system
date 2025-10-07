import { State } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get state by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const state = await State.findByPk(id);
        return NextResponse.json(state);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting state' }, { status: 500 });
    }
}

// Update state
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name } = await request.json();

        const state = await State.findByPk(id);
        if (!state) {
            return NextResponse.json({ error: 'State not found' }, { status: 404 });
        }

        await state.update({ name });
        return NextResponse.json(state);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating state' }, { status: 500 });
    }
}

// Delete state
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const state = await State.findByPk(id);
        if (!state) {
            return NextResponse.json({ error: 'State not found' }, { status: 404 });
        }
        await state.destroy();
        return NextResponse.json(state);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting state' }, { status: 500 });
    }
}

