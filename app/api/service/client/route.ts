import { Client } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create client
export async function POST(request: Request) {
    try {
        const { name, lastname, phone } = await request.json();

        const isClientInDB = await Client.findOne({ where: { phone }, paranoid: false });
        if (isClientInDB) {
            if (isClientInDB.isSoftDeleted()) {
                await isClientInDB.restore();
                return NextResponse.json(isClientInDB);
            } else {
                return NextResponse.json({ error: 'Client already exists' }, { status: 400 });
            }
        }

        const client = await Client.create({ name, lastname, phone });
        return NextResponse.json(client);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating client' }, { status: 500 });
    }
}

// Get clients
export async function GET() {
    try {
        const clients = await Client.findAll();
        return NextResponse.json(clients);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting clients' }, { status: 500 });
    }
}

// Delete multiple clients
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No client IDs provided' }, { status: 400 });
        }
        const deletedCount = await Client.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} clients deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting clients' }, { status: 500 });
    }
}

