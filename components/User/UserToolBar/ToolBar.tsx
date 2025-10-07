import { GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter, GridToolbarContainer, GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import { GridToolbarDivider } from "@mui/x-data-grid/internals";
import { IconButton, Tooltip } from "@mui/material";
import { useUserContext } from "@/components/User/ContextProvider";
import useToolBarController from "./useToolBarController";

export default function CustomToolBar() {

    const usersContext = useUserContext();
    const controller = useToolBarController(usersContext);

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

            <Tooltip title="Add User">
                <IconButton onClick={controller.handleAddUser}>
                    <GridAddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Users">
                <span>
                    <IconButton
                        disabled={usersContext.rowSelected.ids.size === 0}
                        onClick={controller.confirmDeletion}
                    >
                        <GridDeleteIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </GridToolbarContainer>
    )
}