import { GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter, GridToolbarContainer, GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import { GridToolbarDivider } from "@mui/x-data-grid/internals";
import { IconButton, Tooltip } from "@mui/material";
import { useTypeContext } from "@/components/Type/ContextProvider";
import useToolBarController from "./useToolBarController";

export default function CustomToolBar() {
    
    const typeContext = useTypeContext();
    const controller = useToolBarController(typeContext);

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

            <Tooltip title="Add Type">
                <IconButton onClick={controller.handleAddType}>
                    <GridAddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Types">
                <IconButton
                    disabled={typeContext.rowSelected.ids.size === 0}
                    onClick={controller.confirmDeletion}
                >
                    <GridDeleteIcon />
                </IconButton>
            </Tooltip>
        </GridToolbarContainer>
    )
}
