// Stock Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useStockContext } from "../ContextProvider";
import useStockModalController from "./useStockModalController";

export default function StockModal() {
    const stockContext = useStockContext();
    const controller = useStockModalController();

    return (
        <>
            <Dialog
                open={stockContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{stockContext.modal.type === 'add' ? 'Add Stock' : 'Update Stock'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{stockContext.modal.type === 'add' ? 'Add a new stock to the system' : 'Update the stock information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label="Product"
                                    value={controller.formData.ProductId}
                                    onChange={(e) => controller.setFormData({ ...controller.formData, ProductId: e.target.value })}
                                    disabled={stockContext.modal.type === 'edit'}
                                    fullWidth
                                >
                                    {controller.products.map((product) => (
                                        <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Minimum Quantity"
                                type="number"
                                fullWidth
                                value={controller.formData.minimum_quantity}
                                onChange={(e) => controller.setFormData({ ...controller.formData, minimum_quantity: Number(e.target.value) })}
                            />
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
                            {stockContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
