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
                        width: '100%',
                        height: '100%',
                        maxWidth: '60px',
                        maxHeight: '60px',

                    }}
                    onClick={() => setOpenPicture(true)}
                />
            </Tooltip>
            {openPicture && (
                <Dialog open={openPicture} onClose={() => setOpenPicture(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Picture Preview</DialogTitle>
                    <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src={params.value}
                            alt="Picture"
                            style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8 }}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </Stack>
    );
}