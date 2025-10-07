import { NextResponse } from "next/server";
import Transaction from "@/services/backend/models/finance/transaction";
import { Op, Sequelize } from "sequelize";

// GET /api/finance/statistics
// Returns monthly series for incomes, costs, and dollar rate averages
export async function GET() {
    try {
        // Group by month (YYYY-MM) using sequelize date_trunc equivalent for sqlite/postgres
        // Using SQLite/others fallback via strftime; adjust for your dialect if needed
        // We'll try a generic approach with Sequelize.fn and fallback to JS if necessary

        // Sum amounts by month for incomes (Type.name='income') and costs (Type.name='cost') if Type association exists.
        // As a simpler baseline without joins, we classify by sign: amount > 0 => income, amount < 0 => cost.

        const sequelize = (Transaction as any).sequelize as Sequelize;

        // Helper to format YYYY-MM
        const monthExpr = sequelize.getDialect() === 'sqlite'
            ? sequelize.literal("strftime('%Y-%m', date)")
            : sequelize.getDialect() === 'postgres'
                ? sequelize.fn('to_char', sequelize.col('date'), 'YYYY-MM')
                : sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m');

        const transactions = await Transaction.findAll({ raw: true });

        // Aggregate in JS for portability
        const byMonth: Record<string, { income: number; cost: number; dolarAvgSum: number; dolarAvgCount: number }>
            = {};

        for (const t of transactions as any[]) {
            const date = new Date(t.date);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!byMonth[key]) {
                byMonth[key] = { income: 0, cost: 0, dolarAvgSum: 0, dolarAvgCount: 0 };
            }
            const amount = Number(t.amount) || 0;
            if (amount >= 0) {
                byMonth[key].income += amount;
            } else {
                byMonth[key].cost += Math.abs(amount);
            }
            if (typeof t.dolar_rate === 'number') {
                byMonth[key].dolarAvgSum += t.dolar_rate;
                byMonth[key].dolarAvgCount += 1;
            }
        }

        const months = Object.keys(byMonth).sort();
        const incomes = months.map(m => byMonth[m].income);
        const costs = months.map(m => byMonth[m].cost);
        const dollar = months.map(m => byMonth[m].dolarAvgCount
            ? byMonth[m].dolarAvgSum / byMonth[m].dolarAvgCount
            : 0);

        return NextResponse.json({ months, incomes, costs, dollar });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error computing finance statistics' }, { status: 500 });
    }
}


