import { IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import Link from "next/link";
import { Visibility } from "@mui/icons-material";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";

const DetailsLink = ({ 
    params
}: { 
    setActionModal: (actionModal: { open: boolean, action: any, data: any }) => void, 
    actionModal: { open: boolean, action: any, data: any } 
    params: GridRenderCellParams
}) => {

    return (
        <Link href={`/dashboard/stock/${params.row.id}`} key={params.row.id}>
            <IconButton>
                <Visibility />
            </IconButton>
        </Link>
    )
}

export default withUIDisplayControls(DetailsLink);