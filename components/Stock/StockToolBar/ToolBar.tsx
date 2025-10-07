import { GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter, GridToolbarContainer, GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import { GridToolbarDivider } from "@mui/x-data-grid/internals";
import { IconButton, Tooltip } from "@mui/material";
import { useStockContext } from "@/components/Stock/ContextProvider";
import useToolBarController from "./useToolBarController";

export default function CustomToolBar() {
    
    const stockContext = useStockContext();
    const controller = useToolBarController(stockContext);

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

            <Tooltip title="Add Stock">
                <IconButton onClick={controller.handleAddStock} disabled={stockContext.loadingStocks}>
                    <GridAddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Stocks">
                <IconButton
                    disabled={stockContext.rowSelected.ids.size === 0}
                    onClick={controller.confirmDeletion}
                >
                    <GridDeleteIcon />
                </IconButton>
            </Tooltip>
        </GridToolbarContainer>
    )
}
