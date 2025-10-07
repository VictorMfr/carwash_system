import Recipe, { RecipeCreationAttributes } from "../../models/service/recipe";

export const defaultRecipes: Omit<RecipeCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Carro pequeno'
    },
    {
        name: 'Carro mediano'
    },
    {
        name: 'Carro medianogrande'
    },
    {
        name: 'Carro grande'
    },
    {
        name: 'camion pequeño'
    },
    {
        name: 'camion mediano'
    },
    {
        name: 'camion grande'
    }
];

export default async function createRecipes() {
    const recipes = await Recipe.bulkCreate(defaultRecipes);

    if (recipes.length > 0) {
        console.log('Recipes created');
    } else {
        console.log('Recipes already exist');
    }
}
