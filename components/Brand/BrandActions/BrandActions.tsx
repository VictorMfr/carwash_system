import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useBrandActions from "./useBrandActionsController";

export default function BrandActions({ params, context }: { params: GridRenderCellParams, context: any }) {

    const controller = useBrandActions(context, params);
    
    return (
        <>
            <Tooltip title="Edit">
                <IconButton size="small" onClick={controller.updateHandler}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton size="small" onClick={controller.deleteHandler}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}
