/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/service/recipe/route";
import { GET as GETRecipe, PUT as PUTRecipe, DELETE as DELETERecipe } from "@/app/api/service/recipe/[id]/route";
import { Recipe } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testRecipeOne = {
    json: async () => [
        { field: 'name', value: 'Test Recipe One' },
    ] as any,
} as any;

const testRecipeTwo = {
    json: async () => [
        { field: 'name', value: 'Test Recipe Two' },
    ] as any,
} as any;

describe('Rutas de receta', () => {

    // Crear receta
    test('Crear receta', async () => {
        const testData = {
            json: async () => toObject(await testRecipeOne.json())
        } as any;

        const test = await POST(testData);
        const recipe = await test.json();
        expect(test.status).toBe(200);
        
        // Delete recipe
        await (await Recipe.findByPk(recipe.id))?.destroy({ force: true });
    });

    // Obtener recetas
    test('Obtener recetas', async () => {
        const recipes = await GET();
        expect(recipes.status).toBe(200);
    });

    // Visualizar receta
    test('Visualizar receta', async () => {
        const recipe = await GETRecipe(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(recipe.status).toBe(200);
    });

    // Actualizar receta
    test('Actualizar receta', async () => {
        const recipe = await Recipe.create(toObject(await testRecipeOne.json()));
        const testData = {
            json: async () => toObject(await testRecipeOne.json())
        } as any;

        const response = await PUTRecipe(testData, { params: Promise.resolve({ id: recipe.id.toString() }) });
        expect(response.status).toBe(200);
        await recipe.destroy({ force: true });
    });

    // Borrar receta
    test('Borrar receta', async () => {
        const recipe = await Recipe.create(toObject(await testRecipeOne.json()));
        const response = await DELETERecipe(null as any, { params: Promise.resolve({ id: recipe.id.toString() }) });
        expect(response.status).toBe(200);
        await recipe.destroy({ force: true });
    });

    // Borrar multiple recetas
    test('Borrar multiple recetas', async () => {
        const recipeOne = await Recipe.create(toObject(await testRecipeOne.json()));
        const recipeTwo = await Recipe.create(toObject(await testRecipeTwo.json()));

        const request = { json: async () => ({ ids: [recipeOne.id.toString(), recipeTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await recipeOne.destroy({ force: true });
        await recipeTwo.destroy({ force: true });
    });
});

