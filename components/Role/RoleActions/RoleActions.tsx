import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useRoleActions from "./useRoleActionsController";

export default function RoleActions({ params, context }: { params: GridRenderCellParams, context: any }) {

    const controller = useRoleActions(context, params);

    return (
        <Tooltip title="Edit">
            <IconButton size="small" onClick={controller.updateHandler}>
                <EditIcon />
            </IconButton>
        </Tooltip>
    )
}
