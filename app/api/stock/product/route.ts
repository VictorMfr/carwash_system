import { Product } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create product
export async function POST(request: Request) {
    try {
        const { name, unit, isTool } = await request.json();

        const isProductInDB = await Product.findOne({
            where: { name },
            paranoid: false
        });

        console.log(isProductInDB);

        if (isProductInDB) {
            if (isProductInDB.isSoftDeleted()) {
                await isProductInDB.restore();
                return NextResponse.json(isProductInDB);
            } else {
                return NextResponse.json({ error: 'Product already exists' }, { status: 400 });
            }
        } else {
            const product = await Product.create({ name, unit, isTool });
            return NextResponse.json(product);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
    }
}

// Get products
export async function GET() {
    try {
        const products = await Product.findAll();
        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting products' }, { status: 500 });
    }
}

// Delete multiple products
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No product IDs provided' }, { status: 400 });
        }

        const deletedCount = await Product.destroy({
            where: {
                id: ids
            }
        });

        return NextResponse.json({ 
            message: `${deletedCount} products deleted successfully`,
            deletedCount 
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting products' }, { status: 500 });
    }
}
