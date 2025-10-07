import { GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter, GridToolbarContainer, GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import { GridToolbarDivider } from "@mui/x-data-grid/internals";
import { IconButton, Tooltip } from "@mui/material";
import { useFinanceContext } from "@/components/Finance/ContextProvider";
import useToolBarController from "./useToolBarController";

export default function CustomToolBar() {
    
    const financeContext = useFinanceContext();
    const controller = useToolBarController(financeContext);

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

            <Tooltip title="Add Finance Item">
                <IconButton onClick={controller.handleAddFinance}>
                    <GridAddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Finance Items">
                <IconButton
                    disabled={financeContext.rowSelected.ids.size === 0}
                    onClick={controller.confirmDeletion}
                >
                    <GridDeleteIcon />
                </IconButton>
            </Tooltip>
        </GridToolbarContainer>
    )
}