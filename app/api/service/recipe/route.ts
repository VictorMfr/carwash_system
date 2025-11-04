import { Product, Recipe, StockDetails } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create recipe
export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const isRecipeInDB = await Recipe.findOne({ where: { name }, paranoid: false });
        if (isRecipeInDB) {
            if (isRecipeInDB.isSoftDeleted()) {
                await isRecipeInDB.restore();
                return NextResponse.json(isRecipeInDB);
            } else {
                return NextResponse.json({ error: 'Recipe already exists' }, { status: 400 });
            }
        }

        const recipe = await Recipe.create({ name });


        return NextResponse.json(recipe);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating recipe' }, { status: 500 });
    }
}

// Get recipes
export async function GET() {
    try {
        const recipes = await Recipe.findAll({
            include: [{ model: StockDetails, as: 'StockDetails' }]
        });

        const transformed = recipes.map(r => ({
            ...r.toJSON(),
            cart: (r as any).Products?.map((p: any) => ({
                id: p.id,
                name: p.name,
                quantity: p.RecipeProduct?.quantity ?? 0,
            })) ?? []
        }));

        return NextResponse.json(transformed);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting recipes' }, { status: 500 });
    }
}

// Delete multiple recipes
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No recipe IDs provided' }, { status: 400 });
        }
        const deletedCount = await Recipe.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} recipes deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting recipes' }, { status: 500 });
    }
}

