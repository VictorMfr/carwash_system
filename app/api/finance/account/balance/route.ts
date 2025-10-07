import { NextResponse } from "next/server";
import { Account } from "@/services/backend/models/associations";
import { Transaction } from "@/services/backend/models/associations";
import { Sequelize } from "sequelize";

// GET /api/finance/account/balance
// Returns accounts with their current balances
export async function GET() {
    try {
        const sequelize = (Account as any).sequelize as Sequelize;
        
        const accounts = await Account.findAll({
            attributes: [
                'id',
                'name', 
                'description',
                'created_at',
                'updated_at',
                'deleted_at',
                [
                    sequelize.fn('COALESCE', 
                        sequelize.fn('SUM', sequelize.col('Transactions.amount')), 
                        0
                    ),
                    'balance'
                ]
            ],
            include: [
                {
                    model: Transaction,
                    as: 'Transactions',
                    attributes: [],
                    required: false
                }
            ],
            group: ['Account.id'],
            order: [['name', 'ASC']]
        });

        return NextResponse.json(accounts);
    } catch (error) {
        console.error('Error getting account balances:', error);
        return NextResponse.json({ error: 'Error getting account balances' }, { status: 500 });
    }
}
