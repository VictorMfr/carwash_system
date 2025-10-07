import Transaction from "@/services/backend/models/finance/transaction";
import { NextResponse } from "next/server";

// Create transaction
export async function POST(request: Request) {
    try {
        const { date, amount, description, dolar_rate, name } = await request.json();


        const transaction = await Transaction.create({ date, amount, description, dolar_rate, name });


        return NextResponse.json(transaction);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating finance' }, { status: 500 });
    }
}

// Get all transactions
export async function GET(request: Request) {
    try {
        const transactions = await Transaction.findAll();
        return NextResponse.json(transactions);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting transactions' }, { status: 500 });
    }
}