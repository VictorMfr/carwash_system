import useStockModalController from "./useStockDetailsModalController";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Paper, Stack, TextField, CircularProgress } from "@mui/material";
import { useStockDetailsContext } from "../ContextProvider";
import { Fragment } from "react";
import { CloudUpload, Delete } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BrandField from "@/components/Stock/StockForm/Details/Brand/BrandField";
import StateField from "@/components/Stock/StockForm/Details/State/StateField";


export default function StockDetailsModal() {
    const controller = useStockModalController();
    const stockDetailsContext = useStockDetailsContext();

    const actionTitle = (
        stockDetailsContext.modal.type === 'add' ?
            'Add Stock Detail' : 'Update Stock Detail'
    );

    const actionDescription = (
        stockDetailsContext.modal.type === 'add' ?
            'Add a new stock detail to the system' : 'Update the stock detail information'
    );

    const handleContinueAction = () => {
        if (controller.activeStep === 1) {
            controller.handleSubmit();
        } else {
            controller.handleNext();
        }
    }

    const handleClose = () => {
        stockDetailsContext.setModal({ open: false, type: 'add', detail: null });
        controller.resetForm();
    }

    

    return (
        <Dialog
            open={stockDetailsContext.modal.open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{actionTitle}</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <DialogContentText>{actionDescription}</DialogContentText>

                    <Stepper activeStep={controller.activeStep}>
                        <Step>
                            <StepLabel>Fill the fields</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Add an image</StepLabel>
                        </Step>
                    </Stepper>

                    {controller.isToolLoading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                    <Grid container spacing={2}>
                        {controller.activeStep === 0 && (
                            <Fragment>
                                {!controller.isTool && (
                                    <Grid size={12}>
                                        <TextField
                                            label="Quantity"
                                            fullWidth
                                            type="number"
                                            value={controller.formData.quantity}
                                            onChange={(e) => controller.handleInputChange('quantity', e.target.value)}
                                        />
                                    </Grid>
                                )}
                                <Grid size={12}>
                                    <BrandField
                                        onChange={(brand) => controller.handleInputChange('brand', brand)}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <StateField
                                        onChange={(state) => controller.handleInputChange('state', state)}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        label="Price"
                                        fullWidth
                                        type="number"
                                        value={controller.formData.price}
                                        onChange={(e) => controller.handleInputChange('price', e.target.value)}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <FormControl fullWidth>
                                        <DatePicker
                                            label="Entry Date"
                                            value={controller.formData.entryDate}
                                            onChange={(date) => controller.handleInputChange('entryDate', date as any)}
                                        />
                                    </FormControl>
                                </Grid>
                            </Fragment>
                        )}

                        {controller.activeStep === 1 && (
                            <Fragment>
                                <Grid size={12}>
                                    {(controller.formData.image || controller.formData.existingImageUrl) && <Box
                                        sx={{
                                            width: '100%',
                                            height: '128px',
                                            backgroundImage: controller.formData.image 
                                                ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${URL.createObjectURL(controller.formData.image)})`
                                                : controller.formData.existingImageUrl 
                                                    ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${controller.formData.existingImageUrl})`
                                                    : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            border: '1px solid #ccc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}
                                    >
                                        {controller.formData.image ? (
                                            <img
                                                src={URL.createObjectURL(controller.formData.image)}
                                                alt="Preview"
                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                            />
                                        ) : controller.formData.existingImageUrl ? (
                                            <img
                                                src={controller.formData.existingImageUrl}
                                                alt="Current Image"
                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <Stack direction="column" alignItems="center" justifyContent="center" height="100%">
                                                <CloudUpload color="disabled" sx={{ fontSize: 48, mb: 2 }} />
                                                <Typography color="text.secondary">No image selected (Optional)</Typography>
                                            </Stack>
                                        )}
                                    </Box>}
                                </Grid>
                                <Grid size={12}>
                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            component='label'
                                            variant="contained"
                                            startIcon={<CloudUpload />}
                                            size="large"
                                            sx={{ flex: 1 }}
                                        >
                                            {controller.formData.existingImageUrl ? 'Change Image' : 'Upload Image'}
                                            <input
                                                type="file"
                                                id="file-input"
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    controller.handleInputChange('image', file);
                                                    // Clear existing image URL when new image is selected
                                                    if (file) {
                                                        controller.handleInputChange('existingImageUrl', null);
                                                    }
                                                }}
                                            />
                                        </Button>
                                        {controller.formData.existingImageUrl && (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                startIcon={<Delete />}
                                                onClick={() => {
                                                    controller.handleInputChange('existingImageUrl', null);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </Stack>
                                </Grid>
                            </Fragment>
                        )}
                    </Grid>
                    )}
                </Stack>


                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        onClick={controller.activeStep === 0 ? handleClose : controller.handleBack}
                        sx={{ mr: 1 }}
                    >
                        {controller.activeStep === 0 ? 'Close' : 'Back'}
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button 
                        onClick={handleContinueAction}
                        loading={controller.loading}
                    >
                        {controller.activeStep === 1 
                            ? (stockDetailsContext.modal.type === 'add' ? 'Add' : 'Update') 
                            : 'Next'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
