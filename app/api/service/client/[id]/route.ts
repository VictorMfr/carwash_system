import { Client } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get client by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const client = await Client.findByPk(id);
        return NextResponse.json(client);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting client' }, { status: 500 });
    }
}

// Update client
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name, lastname, phone } = await request.json();

        const client = await Client.findByPk(id);
        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        await client.update({ name, lastname, phone });
        return NextResponse.json(client);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating client' }, { status: 500 });
    }
}

// Delete client
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const client = await Client.findByPk(id);
        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }
        await client.destroy();
        return NextResponse.json(client);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting client' }, { status: 500 });
    }
}

