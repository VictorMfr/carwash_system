import { Account } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get account by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const account = await Account.findByPk(id);
        return NextResponse.json(account);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting account' }, { status: 500 });
    }
}

// Update account
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name, description } = await request.json();

        const account = await Account.findByPk(id);
        if (!account) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }

        await account.update({ name, description });
        return NextResponse.json(account);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating account' }, { status: 500 });
    }
}

// Delete account
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const account = await Account.findByPk(id);
        if (!account) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }
        await account.destroy();
        return NextResponse.json(account);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting account' }, { status: 500 });
    }
}

