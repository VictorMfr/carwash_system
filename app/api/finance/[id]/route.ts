import Transaction from "@/services/backend/models/finance/transaction";
import { NextResponse } from "next/server";

// Update transaction by id
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { date, amount, description, dolar_rate, name } = await request.json();

        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }

        await transaction.update({ date, amount, description, dolar_rate, name });
        return NextResponse.json(transaction);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating transaction' }, { status: 500 });
    }
}

// Delete transaction by id
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }
        await transaction.destroy();
        return NextResponse.json(transaction);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting transaction' }, { status: 500 });
    }
}
