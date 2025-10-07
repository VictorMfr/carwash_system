import { Fragment } from "react";
import { Box, Button, Fab, FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import BrandField from "./Brand/BrandField";
import StateField from "./State/StateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CloudUpload, Delete } from "@mui/icons-material";
import useDetailsController from "./useDetailsController";

interface DetailsProps {
    initialData?: any;
    onUpdate?: (data: any) => void;
    isTool?: boolean;
}

export default function Details({ initialData, onUpdate, isTool = false }: DetailsProps) {
    const controller = useDetailsController({
        initialData,
        onUpdate,
        isTool
    });

    return (
        <Fragment>
            <Grid size={12}>
                <Typography variant="h6">Details</Typography>
            </Grid>
            <Grid size={6} container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <BrandField onChange={(brand) => controller.handleFieldChange('brand', brand)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <StateField onChange={(state) => controller.handleFieldChange('state', state)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        disabled={isTool}
                        value={isTool ? 1 : controller.detailData.quantity}
                        onChange={(e) => controller.handleFieldChange('quantity', Number(e.target.value))}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        value={controller.detailData.price}
                        onChange={(e) => controller.handleFieldChange('price', Number(e.target.value))}
                    />
                </Grid>
            </Grid>
            <Grid size={6} spacing={2}>
                <Paper
                    sx={{
                        maxHeight: { xs: '100%', md: '128px' },
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>

                    {controller.detailData.image.preview ? (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${controller.detailData.image.preview})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                            <img
                                src={controller.detailData.image.preview}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                            <Fab
                                size="small"
                                color="error"
                                sx={{ position: 'absolute', top: -8, right: -8 }}
                                onClick={controller.handleImageRemove}
                            >
                                <Delete />
                            </Fab>
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            <CloudUpload sx={{ fontSize: 48, mb: 2 }} />
                            <Typography variant="body2">
                                No image selected (Optional)
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Grid>
            <Grid size={12} container spacing={2}>
                <Grid size={6}>
                    <FormControl fullWidth>
                        <DatePicker
                            label="Entry Date"
                            value={controller.detailData.entryDate}
                            onChange={(date) => controller.handleFieldChange('entryDate', date)}
                        />
                    </FormControl>
                </Grid>
                <Grid size={6}>
                    <FormControl fullWidth sx={{ height: '100%' }}>
                        <Button
                            component='label'
                            variant="contained"
                            startIcon={<CloudUpload />}
                            size="large"
                            sx={{ height: '100%' }}
                        >
                            Upload File
                            <input
                                type="file"
                                id="file-input"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={controller.handleImageSelect}
                            />
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Fragment>
    )
}