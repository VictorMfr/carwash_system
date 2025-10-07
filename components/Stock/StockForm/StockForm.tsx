import { Grid, Typography, Button, TextField, Select, InputLabel, FormControl, MenuItem, Fab, Tooltip } from "@mui/material";
import useStockFormController from "./useStockFormController";
import ProductField from "./Product/ProductField";
import { units } from "@/components/Product/ProductModal/ProductModal";
import Details from "./Details/Details";
import { Add, Delete } from "@mui/icons-material";


export default function StockForm() {

    const controller = useStockFormController();

    return (
        <Grid spacing={2} container>
            {/* Product Name */}
            <Grid size={12}>
                <Typography variant="h6">Product</Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
                <ProductField onChange={controller.handleProductChange} />
            </Grid>

            {/* Is Tool */}
            <Grid size={{ xs: 6, md: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="is-tool-label">Is Tool</InputLabel>
                    <Select
                        labelId="is-tool-label"
                        label="Is Tool"
                        value={controller.formData.isTool}
                        onChange={(e) => controller.setFormData({ ...controller.formData, isTool: e.target.value })}
                    >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                    </Select>
                </FormControl>
            </Grid>


            {/* Unit */}
            <Grid size={{ xs: 6, md: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="unit-label">Unit</InputLabel>
                    <Select
                        disabled={controller.formData.isTool === 1}
                        labelId="unit-label"
                        label="Unit"
                        value={controller.formData.unit}
                        onChange={(e) => controller.setFormData({ ...controller.formData, unit: e.target.value })}
                    >
                        {units.map((product) => (
                            <MenuItem key={product.id} value={product.name}>{product.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Minimum Quantity */}
            <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                    fullWidth
                    type="number"
                    required
                    label="Minimum Quantity"
                    value={controller.formData.minimum_quantity.toString()}
                    onChange={(e) => controller.setFormData({ ...controller.formData, minimum_quantity: Number(e.target.value) })}

                />
            </Grid>

            {/* Dynamic Details */}
            {controller.details.map((detail, index) => (
                <Grid container size={12} key={detail.id}>
                    <Details
                        initialData={detail}
                        onUpdate={(updatedData) => controller.updateDetail(detail.id, updatedData)}
                        isTool={controller.formData.isTool === 1}
                    />
                </Grid>
            ))}

            {/* Action Buttons */}
            <Grid size={12} container spacing={2} justifyContent="flex-end">
                <Tooltip title="Add Detail">
                    <Fab
                        color="primary"
                        size="small"
                        sx={{ boxShadow: 'none' }}
                        onClick={controller.addDetail}
                    >
                        <Add />
                    </Fab>
                </Tooltip>
                {controller.details.length > 0 && (
                    <Tooltip title="Remove Last Detail">
                        <Fab
                            color="error"
                            size="small"
                            sx={{ boxShadow: 'none' }}
                            onClick={controller.removeDetail}
                        >
                            <Delete />
                        </Fab>
                    </Tooltip>
                )}
            </Grid>

            {/* Save Button */}
            <Grid size={12}>
                <Button variant="contained" color="primary">Save</Button>
            </Grid>
        </Grid>
    )
}