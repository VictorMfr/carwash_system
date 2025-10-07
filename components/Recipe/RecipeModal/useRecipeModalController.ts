import { useEffect, useState } from "react";
import { useRecipeContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: ''
}

export default function useRecipeModalController() {

    const recipeContext = useRecipeContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateRecipe = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/service/recipe/${id}`, {
                ...data
            });

            recipeContext.setRecipes(prev => prev.map(recipe => recipe.id === Number(id) ? response.data : recipe));
            setFormData(initialFormData);
            recipeContext.setModal({ open: false, type: 'add', recipe: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addRecipe = async (data: any) => {
        try {
            const response = await api.post(`/service/recipe`, {
                ...data
            });
            
            recipeContext.setRecipes([...recipeContext.recipes, response.data]);
            setFormData(initialFormData);
            recipeContext.setModal({ open: false, type: 'add', recipe: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        recipeContext.setModal({ open: false, type: 'add', recipe: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (recipeContext.modal.type === 'add') {
                await addRecipe(formData);
                uiContext.setSnackbar({ open: true, message: 'Recipe added successfully', severity: 'success' });
            } else {
                await updateRecipe(recipeContext.modal.recipe.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Recipe updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating recipe', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (recipeContext.modal.recipe) {
            setFormData(recipeContext.modal.recipe);
        }
    }, [recipeContext.modal.recipe]);

    return {
        formData,
        setFormData,
        updateRecipe,
        addRecipe,
        handleClose,
        handleSubmit,
        loading
    }
}
