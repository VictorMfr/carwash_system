import { RecipeContextType } from "../ContextProvider";
import useFetchRecipes from "@/hooks/fetch/useFetchRecipes";

export default function useRecipeController(context?: RecipeContextType) {
    const { recipes, loadingRecipes } = useFetchRecipes(context);

    return {
        recipes,
        loadingRecipes
    }
}
