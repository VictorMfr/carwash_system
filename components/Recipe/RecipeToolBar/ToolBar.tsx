import { GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter, GridToolbarContainer, GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import { GridToolbarDivider } from "@mui/x-data-grid/internals";
import { IconButton, Tooltip } from "@mui/material";
import { useRecipeContext } from "@/components/Recipe/ContextProvider";
import useToolBarController from "./useToolBarController";

export default function CustomToolBar() {
    
    const recipeContext = useRecipeContext();
    const controller = useToolBarController(recipeContext);

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarDivider />
            <GridToolbarExport />
            <GridToolbarDivider />
            <GridToolbarFilterButton />
            <GridToolbarDivider />
            <GridToolbarDensitySelector />
            <GridToolbarDivider />
            <GridToolbarQuickFilter />

            <Tooltip title="Add Recipe">
                <IconButton onClick={controller.handleAddRecipe}>
                    <GridAddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Recipes">
                <IconButton
                    disabled={recipeContext.rowSelected.ids.size === 0}
                    onClick={controller.confirmDeletion}
                >
                    <GridDeleteIcon />
                </IconButton>
            </Tooltip>
        </GridToolbarContainer>
    )
}
