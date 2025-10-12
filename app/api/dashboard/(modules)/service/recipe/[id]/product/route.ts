import { NextResponse } from "next/server";
import { Product, Recipe } from "@/services/backend/models/associations";
import RecipeProduct from "@/services/backend/models/service/recipeProduct";

type Item = { productId: number; quantity: number };

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const items: Item[] = Array.isArray(body?.items) ? body.items : (body?.productId ? [{ productId: body.productId, quantity: body.quantity || 1 }] : []);

        const recipe = await Recipe.findByPk(id);
        if (!recipe) return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });

        for (const item of items) {
            if (!item.productId || item.quantity <= 0) continue;
            await RecipeProduct.upsert({ recipeId: Number(id), productId: item.productId, quantity: item.quantity });
        }

        const updated = await Recipe.findByPk(id, {
            include: [{ model: Product, as: 'Products', through: { attributes: ['quantity'] } }]
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error saving recipe products' }, { status: 500 });
    }
}


