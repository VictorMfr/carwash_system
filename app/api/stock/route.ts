import { decrypt, getSession } from "@/lib/session";
import { Product, Stock, StockDetails, User } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create stock
export async function POST(request: Request) {
    try {
        const { ProductId, minimum_quantity } = await request.json();

        if (!ProductId || !minimum_quantity) {
            return NextResponse.json({ error: 'ProductId and minimum_quantity are required' }, { status: 400 });
        }

        const product = await Product.findByPk(ProductId);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 400 });
        }

        // Get user id from session
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 400 });
        }

        const decoded = await decrypt(session);

        if (!decoded) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        const stock = await Stock.create({
            total_quantity: 0,
            minimum_quantity
        });

        await stock.setProduct(product);
        await stock.setUser(user);

        // Return the stock with the product and user
        const formatted = {
            ...stock.toJSON(),
            name: product.name,
            unit: product.unit,
        };

        return NextResponse.json(formatted);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating stock' }, { status: 500 });
    }
}

// Get stocks
export async function GET() {
    try {
        const stocks = await Stock.findAll({
            include: [{
                model: Product,
                as: 'Product',
                attributes: ['name', 'unit'],
            }, {
                model: StockDetails,
                as: 'StockDetails',
                attributes: ['quantity', 'price'],
            }]
        });

        console.log(stocks)

        const formatted = stocks.map((s: Stock) => {
            const json: any = s.toJSON();

            return {
                ...json,
                name: json.Product.name,
                unit: json.Product.unit,
                total_quantity: json.StockDetails.reduce((acc: number, curr: StockDetails) => acc + curr.quantity, 0),
            }
        });

        console.log(formatted)

        return NextResponse.json(formatted);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting stocks' }, { status: 500 });
    }
}

// Delete multiple stocks
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No stock IDs provided' }, { status: 400 });
        }
        const deletedCount = await Stock.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} stocks deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting stocks' }, { status: 500 });
    }
}

