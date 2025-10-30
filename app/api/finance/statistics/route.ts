import { NextResponse } from "next/server";
import Transaction from "@/services/backend/models/finance/transaction";
import { Op, Sequelize } from "sequelize";

// GET /api/finance/statistics
// Returns monthly series formatted as arrays of objects compatible with charts
export async function GET() {
    try {

        /*
        statistics:
        - incomes by month (Line Chart)
        - costs by month (Line Chart)
        - dollar rate averages by month (Line Chart)
        */

        const sequelize = (Transaction as any).sequelize as Sequelize;


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

        const incomeData = months.map(month => ({ month, income: byMonth[month].income }));
        const costData = months.map(month => ({ month, cost: byMonth[month].cost }));
        const dollarData = months.map(month => ({
            month,
            dollar: byMonth[month].dolarAvgCount
                ? byMonth[month].dolarAvgSum / byMonth[month].dolarAvgCount
                : 0
        }));

        return NextResponse.json({ incomeData, costData, dollarData });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error computing finance statistics' }, { status: 500 });
    }
}


