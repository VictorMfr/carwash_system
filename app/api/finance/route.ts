import { decrypt, getSession } from "@/lib/session";
import { Account, Method, Transaction, User } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create transaction
export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 400 });
        }

        const decoded = await decrypt(session);
        if (!decoded) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        const userId = Number(decoded.userId);

        const { date, amount, description, dollar_rate, account, method } = await request.json();

        const [day, month, year] = (date as string).split('-');
        const formattedDate = new Date(Number(year), Number(month) - 1, Number(day));

        const transaction = await Transaction.create({ 
            date: formattedDate, 
            amount, 
            description, 
            dollar_rate 
        });

        if (!transaction) {
            return NextResponse.json({ error: 'Error creating transaction' }, { status: 500 });
        }

        await transaction.setAccount(account.id);
        await transaction.setMethod(method.id);
        await transaction.setUser(userId);

        const response = {
            id: transaction.id,
            date: transaction.date,
            amount: transaction.amount,
            description: transaction.description,
            dollar_rate: transaction.dollar_rate,
            account: account.name,
            method: method.name,
            user: transaction.User?.name || ''
        };

        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating finance' }, { status: 500 });
    }
}

// Get all transactions
export async function GET(request: Request) {
    try {
        const transactions = await Transaction.findAll({
            include: [
                { model: Account, as: 'Account' },
                { model: Method, as: 'Method' },
                { model: User, as: 'User' }
            ]
        });


        const response = transactions.map(transaction => ({
            id: transaction.id,
            date: transaction.date,
            amount: transaction.amount,
            description: transaction.description,
            dollar_rate: transaction.dollar_rate,
            account: transaction.Account?.name || '',
            method: transaction.Method?.name || '',
            user: transaction.User?.name || ''
        }));

        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting transactions' }, { status: 500 });
    }
}