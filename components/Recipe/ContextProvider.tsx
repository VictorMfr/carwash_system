// Recipe Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface RecipeContextType {
    recipes: any[];
    setRecipes: Dispatch<SetStateAction<any[]>>;
    loadingRecipes: boolean;
    setLoadingRecipes: (loadingRecipes: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        recipe: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', recipe: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const RecipeContext = createContext<RecipeContextType>({
    recipes: [],
    setRecipes: () => { },
    loadingRecipes: false,
    setLoadingRecipes: () => { },
    modal: {
        open: false,
        type: 'add',
        recipe: null,
    },
    setModal: () => { },
    rowSelected: {
        type: 'include',
        ids: new Set()
    },
    setRowSelected: () => { },
    loadingModal: false,
    setLoadingModal: () => { },
});

export const useRecipeContext = () => {
    return useContext(RecipeContext);
}

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [recipes, setRecipes] = useState<GridRowsProp[]>([]);
    const [loadingRecipes, setLoadingRecipes] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        recipe: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        recipes,
        setRecipes,
        loadingRecipes,
        setLoadingRecipes,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <RecipeContext.Provider value={data}>
                {children}
            </RecipeContext.Provider>
        </>
    );
};