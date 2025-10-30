import { Avatar, Dialog, DialogContent, DialogTitle, Stack, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";

export default function PictureCell(params: GridRenderCellParams) {
    const [openPicture, setOpenPicture] = useState(false);

    return (
        <Stack alignItems="center" justifyContent="center" width="100%" height="100%">
            <Tooltip title="View Picture">
                <Avatar
                    src={params.value}
                    alt="Picture"
                    variant="rounded"
                    sx={{
                        cursor: 'pointer',
                        mx: 'auto',
                        width: 80,
                        height: 80,
                    }}
                    onClick={() => setOpenPicture(true)}
                />
            </Tooltip>
            {openPicture && (
                <Dialog open={openPicture} onClose={() => setOpenPicture(false)} maxWidth="sm" fullWidth>

                    <img
                        src={params.value}
                        alt="Picture"
                        style={{ objectFit: 'contain', aspectRatio: 1 }}
                    />

                </Dialog>
            )}
        </Stack>
    );
}