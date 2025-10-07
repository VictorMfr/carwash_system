import { GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter, GridToolbarContainer, GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import { GridToolbarDivider } from "@mui/x-data-grid/internals";
import { IconButton, Tooltip } from "@mui/material";
import { useOperatorContext } from "@/components/Operator/ContextProvider";
import useToolBarController from "./useToolBarController";

export default function CustomToolBar() {
    
    const operatorContext = useOperatorContext();
    const controller = useToolBarController(operatorContext);

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

            <Tooltip title="Add Operator">
                <IconButton onClick={controller.handleAddOperator}>
                    <GridAddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Operators">
                <IconButton
                    disabled={operatorContext.rowSelected.ids.size === 0}
                    onClick={controller.confirmDeletion}
                >
                    <GridDeleteIcon />
                </IconButton>
            </Tooltip>
        </GridToolbarContainer>
    )
}
