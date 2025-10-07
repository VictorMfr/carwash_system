// Product Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText, Select, MenuItem, InputLabel, FormControl, Switch, FormControlLabel } from "@mui/material";
import { useProductContext } from "../ContextProvider";
import useProductModalController from "./useProductModalController";

export const units = [
    { id: 1, name: 'kg' },
    { id: 2, name: 'gr' },
    { id: 3, name: 'lt' },
    { id: 4, name: 'ml' },
    { id: 5, name: 'u' },
    { id: 6, name: 'pcs' },
    { id: 7, name: 'mtr' },
]

export default function ProductModal() {
    const productContext = useProductContext();
    const controller = useProductModalController();

    return (
        <>
            <Dialog
                open={productContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{productContext.modal.type === 'add' ? 'Add Product' : 'Update Product'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{productContext.modal.type === 'add' ? 'Add a new product to the system' : 'Update the product information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2} >
                        <Grid size={12}>
                            <TextField
                                required
                                margin="dense"
                                label="Name"
                                fullWidth
                                value={controller.formData.name}
                                onChange={(e) => controller.setFormData({ ...controller.formData, name: e.target.value })}
                            />
                            {/* Is Tool switch */}
                            <FormControlLabel control={
                                <Switch
                                    checked={controller.formData.isTool}
                                    onChange={(e: any) => controller.setFormData({ ...controller.formData, isTool: e.target.checked })}
                                />
                            } label="Is Tool" />
                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth margin="dense" disabled={controller.formData.isTool}>
                                <InputLabel>Unit</InputLabel>
                                <Select
                                    value={controller.formData.unit}
                                    label="Unit"
                                    
                                    onChange={(e) => controller.setFormData({ ...controller.formData, unit: e.target.value })}
                                >
                                    {units.map((unit) => (
                                        <MenuItem key={unit.id} value={unit.name}>{unit.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button
                            disabled={controller.loading}
                            onClick={controller.handleClose}
                        >
                            Cancel
                        </Button>
                        <Button loading={controller.loading} onClick={controller.handleSubmit}>
                            {productContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
