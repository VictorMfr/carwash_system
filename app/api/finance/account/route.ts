import { Account } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create account
export async function POST(request: Request) {
    try {
        const { name, description } = await request.json();

        const isAccountInDB = await Account.findOne({ where: { name }, paranoid: false });
        if (isAccountInDB) {
            if (isAccountInDB.isSoftDeleted()) {
                await isAccountInDB.restore();
                return NextResponse.json(isAccountInDB);
            } else {
                return NextResponse.json({ error: 'Account already exists' }, { status: 400 });
            }
        }

        const account = await Account.create({ name, description });
        return NextResponse.json(account);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating account' }, { status: 500 });
    }
}

// Get accounts
export async function GET() {
    try {
        const accounts = await Account.findAll();
        return NextResponse.json(accounts);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting accounts' }, { status: 500 });
    }
}

// Delete multiple accounts
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No account IDs provided' }, { status: 400 });
        }
        const deletedCount = await Account.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} accounts deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting accounts' }, { status: 500 });
    }
}

