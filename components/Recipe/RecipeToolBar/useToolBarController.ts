import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { RecipeContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useToolBarController(recipeContext: RecipeContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/service/recipe`, {
                data: {
                    ids: Array.from(recipeContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            recipeContext.setRecipes(prev => prev.filter(recipe => !recipeContext.rowSelected.ids.has(recipe.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Recipes',
            message: 'Are you sure you want to delete these recipes?',
            severity: 'warning',
            actions: [
                {
                    label: 'Cancel',
                    onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
                },
                {
                    label: 'Delete',
                    onClick: (setLoading) => handleDeletion(setLoading)
                }
            ]
        })
    }

    const handleAddRecipe = () => {
        recipeContext.setModal({ open: true, type: 'add', recipe: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddRecipe,
    }
}
