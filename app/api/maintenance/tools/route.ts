import { NextResponse } from "next/server";
import { Product, State, Stock, StockDetails, Brand } from "@/services/backend/models/associations";

// List all stockDetails for tool products with their related Product, Brand, and State
export async function GET() {
    try {
        const stockDetails = await StockDetails.findAll({
            attributes: ['id', 'quantity', 'price', 'entry_date', 'picture'],
            include: [
                {
                    model: Stock,
                    attributes: ['id', 'total_quantity', 'minimum_quantity'],
                    required: true,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'isTool'],
                            required: true,
                            where: { isTool: true }
                        }
                    ]
                },
                {
                    model: Brand,
                    attributes: ['id', 'name'],
                    required: false
                },
                {
                    model: State,
                    attributes: ['id', 'name'],
                    required: false
                }
            ]
        });

        const records = stockDetails.map((stockDetail: any) => {
            const json = stockDetail.toJSON();
            return {
                StockDetails: {
                    id: json.id,
                    quantity: json.quantity,
                    price: json.price,
                    entry_date: json.entry_date,
                    picture: json.picture
                },
                Stock: {
                    id: json.Stock?.id,
                },
                Product: {
                    id: json.Stock.Product.id,
                    name: json.Stock.Product.name,
                    description: json.Stock.Product.description,
                    isTool: json.Stock.Product.isTool
                },
                Brand: {
                    id: json.Brand?.id || null,
                    name: json.Brand?.name || 'Sin marca'
                },
                State: {
                    id: json.State?.id || null,
                    name: json.State?.name || 'Sin estado'
                }
            };
        });

        console.log(records);

        return NextResponse.json(records);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting maintenance tools' }, { status: 500 });
    }
}


