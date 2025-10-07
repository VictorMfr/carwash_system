import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function StockDetailsForm() {
    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <FormControl fullWidth>
                        <InputLabel id="brand-select-label">Brand</InputLabel>
                        <Select labelId="brand-select-label" label="Brand">
                            <MenuItem value="1">Brand 1</MenuItem>
                            <MenuItem value="2">Brand 2</MenuItem>
                            <MenuItem value="3">Brand 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={6}>
                    <FormControl fullWidth>
                        {/* State Select */}
                        <InputLabel id="state-select-label">State</InputLabel>
                        <Select labelId="state-select-label" label="State">
                            <MenuItem value="1">State 1</MenuItem>
                            <MenuItem value="2">State 2</MenuItem>
                            <MenuItem value="3">State 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={12}>
                    <FormControl fullWidth>
                        {/* Quantity */}
                        <InputLabel id="quantity-input-label">Quantity</InputLabel>
                        <TextField type="number" label="Quantity" />
                    </FormControl>
                </Grid>
                <Grid size={12}>
                    <FormControl fullWidth>
                        {/* Price */}
                        <InputLabel id="price-input-label">Price</InputLabel>
                        <TextField type="number" label="Price" />
                    </FormControl>
                </Grid>
                <Grid size={12}>
                    <DatePicker label="Entry Date" />
                </Grid>
            </Grid>
        </Stack>
    )
}