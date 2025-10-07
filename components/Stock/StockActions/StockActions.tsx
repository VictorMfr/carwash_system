import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useStockActions from "./useStockActionsController";

export default function StockActions({ params, context }: { params: GridRenderCellParams, context: any }) {

    const controller = useStockActions(context, params);
    
    return (
        <>
            <Tooltip title="View details">
                <IconButton size="small" onClick={controller.viewDetailsHandler}>
                    <VisibilityIcon />
                </IconButton>
            </Tooltip>
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
