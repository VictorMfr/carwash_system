import { NextResponse } from "next/server";
import { StockDetails, Brand, Stock, Product, State } from "@/services/backend/models/associations";

export async function GET() {
    try {

        /*
        statistics:
        - products by brand (Pie Chart)
        - products by state (Pie Chart)
        - entry by month (Line Chart)
        - cost by month (Line Chart)
        */

        // ordered by entry_date
        const stockDetails = await StockDetails.findAll({
            include: [
                {
                    model: Stock,
                    as: 'Stock',
                    include: [
                        {
                            model: Product,
                            as: 'Product',
                            attributes: ['name'],
                        }
                    ]
                },
                {
                    model: Brand,
                    as: 'Brand',
                    attributes: ['name'],
                },
                {
                    model: State,
                    as: 'State',
                    attributes: ['name'],
                }
            ],
            order: [['entry_date', 'DESC']]
        });

        if (!stockDetails) {
            return NextResponse.json({ error: "Stock details not found" }, { status: 404 });
        }

        // Products by brand (Pie Chart)
        let productsByBrand = [];
        let productsByBrandMap: any = {};

        stockDetails.forEach(details => {
            if (!productsByBrandMap[details.Brand.name]) {
                productsByBrandMap[details.Brand.name] = 0;
            }
            productsByBrandMap[details.Brand.name]++;
        })

        productsByBrand = Object.entries(productsByBrandMap).map(([brand, count], idx) => ({
            id: idx,
            value: count,
            label: brand,
        }));

        // Products by state (Pie Chart)
        let productsByState = [];
        let productsByStateMap: any = {};

        stockDetails.forEach(details => {
            if (!productsByStateMap[details.State.name]) {
                productsByStateMap[details.State.name] = 0;
            }
            productsByStateMap[details.State.name]++;
        })

        productsByState = Object.entries(productsByStateMap).map(([state, count], idx) => ({
            id: idx,
            value: count,
            label: state,
        }));


        // Costs aggregated by month for line chart (Line Chart)
        const monthlyCostMap: Record<string, number> = {};
        stockDetails.forEach(details => {
            const date = new Date(details.entry_date);
            const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            monthlyCostMap[month] = (monthlyCostMap[month] || 0) + Number(details.price || 0);
        });

        const costData = Object.keys(monthlyCostMap)
            .sort()
            .map(month => ({ month, cost: monthlyCostMap[month] }))
            .slice(-6); // last 6 months

        const consumptionData: any[] = [];

        // Entry by month (Line Chart)
        const entryByMonthMap: Record<string, number> = {};
        stockDetails.forEach(details => {
            const date = new Date(details.entry_date);
            const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            entryByMonthMap[month] = (entryByMonthMap[month] || 0) + 1;
        });
        
        const entryData = Object.keys(entryByMonthMap)
            .sort()
            .map(month => ({ month, entry: entryByMonthMap[month] }))
            .slice(-6); // last 6 months

        return NextResponse.json({ productsByBrand, productsByState, consumptionData, costData, entryData });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error getting stock statistics" }, { status: 500 });
    }
}


