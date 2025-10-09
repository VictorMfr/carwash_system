import { GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter, GridToolbarContainer, GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import { GridToolbarDivider } from "@mui/x-data-grid/internals";
import { IconButton, Tooltip } from "@mui/material";
import { useRoleContext } from "@/components/Role/ContextProvider";
import useToolBarController from "./useToolBarController";

export default function CustomToolBar() {
    
    const roleContext = useRoleContext();
    const controller = useToolBarController(roleContext);

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
        </GridToolbarContainer>
    )
}
