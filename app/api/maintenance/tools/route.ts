import { NextResponse } from "next/server";
import { Product, State, Stock, StockDetails, Brand } from "@/services/backend/models/associations";
import { Dayjs } from "dayjs";

// List all stockDetails for tool products with their related Product, Brand, and State
export async function GET() {
    try {
        const stockDetails = await StockDetails.findAll({
            attributes: ['id', 'quantity', 'price', 'entry_date', 'picture'],
            include: [
                {
                    model: Stock,
                    as: 'Stock',
                    attributes: ['id', 'total_quantity', 'minimum_quantity'],
                    required: true,
                    include: [
                        {
                            model: Product,
                            as: 'Product',
                            attributes: ['id', 'name', 'isTool'],
                            required: true,
                            where: { isTool: true }
                        }
                    ]
                },
                {
                    model: Brand,
                    as: 'Brand',
                    attributes: ['id', 'name'],
                    required: false
                },
                {
                    model: State,
                    as: 'State',
                    attributes: ['id', 'name'],
                    required: false
                }
            ]
        });

        const records = stockDetails.map((stockDetail: any) => {
            const json = stockDetail.toJSON();
            return {
                id: json.id,
                picture: json.picture,
                name: json.Stock?.Product?.name ?? 'Sin nombre',
                brand: json.Brand?.name || 'Sin marca',
                state: json.State?.name || 'Sin estado',
                stateId: json.State?.id,
                brandId: json.Brand?.id,
                stockId: json.Stock?.id,
                price: json.price,
                entry_date: new Date(json.entry_date).toLocaleDateString('es-ES'),
            };
        });


        return NextResponse.json(records);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting maintenance tools' }, { status: 500 });
    }
}


