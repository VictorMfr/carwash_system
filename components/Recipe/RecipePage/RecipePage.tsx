// Recipe Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useRecipeContext } from "@/components/Recipe/ContextProvider";
import useRecipeController from "@/components/Recipe/RecipePage/useRecipeController";
import RecipeActions from "@/components/Recipe/RecipeActions/RecipeActions";
import CustomToolBar from "@/components/Recipe/RecipeToolBar/ToolBar";
import RecipeModal from "@/components/Recipe/RecipeModal/RecipeModal";

export default function RecipePage() {
    
    const recipeContext = useRecipeContext();
    const controller = useRecipeController(recipeContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <RecipeActions
                    params={params}
                    context={recipeContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Recipes</Typography>
                <Typography variant="body1">
                    Manage your service recipes here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingRecipes}
                rows={recipeContext.recipes}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={recipeContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    recipeContext.setRowSelected(newSelectionModel);
                }}
            />

            <RecipeModal/>
        </Stack>
    )
}
