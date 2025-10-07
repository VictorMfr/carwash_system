import { NextResponse } from "next/server";
import { Product } from "@/services/backend/models/associations";

// Get stock in product
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await Product.findByPk(id);
        
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const stock = await product.getStock();

        if (!stock) {
            console.log('Stock not found');
        }

        return NextResponse.json(stock);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting product' }, { status: 500 });
    }
}