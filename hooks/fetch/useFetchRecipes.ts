import { RecipeContextType } from "@/components/Recipe/ContextProvider";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function useFetchRecipes(context?: RecipeContextType) {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loadingRecipes, setLoadingRecipes] = useState(true);

    const fetchRecipes = async () => {
        try {
            setLoadingRecipes(true);
            const response = await api.get('/api/service/recipe');

            if (context) {
                context.setRecipes(response.data);
                context.setLoadingRecipes(false);
            } else {
                setRecipes(response.data);
                setLoadingRecipes(false);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setLoadingRecipes(false);
            if (context) {
                context.setLoadingRecipes(false);
            }
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    return { recipes, loadingRecipes, setRecipes };
}
