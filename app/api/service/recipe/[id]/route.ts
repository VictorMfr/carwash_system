import { Recipe } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get recipe by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const recipe = await Recipe.findByPk(id);
        return NextResponse.json(recipe);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting recipe' }, { status: 500 });
    }
}

// Update recipe
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name } = await request.json();

        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        await recipe.update({ name });
        return NextResponse.json(recipe);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating recipe' }, { status: 500 });
    }
}

// Delete recipe
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }
        await recipe.destroy();
        return NextResponse.json(recipe);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting recipe' }, { status: 500 });
    }
}

