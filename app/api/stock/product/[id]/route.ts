import { Product } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get product by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await Product.findByPk(id);
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting product' }, { status: 500 });
    }
}

// Update product
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name, unit, isTool } = await request.json();

        const product = await Product.findByPk(id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        await product.update({ name, unit, isTool });
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
    }
}

// Delete product
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await Product.findByPk(id);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        await product.destroy();
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
    }
}
