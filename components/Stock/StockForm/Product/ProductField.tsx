import { Fragment, HTMLAttributes, useEffect } from "react";
import useProductFieldController from "./useProductFieldController";
import { ProductType } from "@/services/backend/models/stock/product";
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    Select,
    MenuItem,
    Grid,
    DialogContentText,
    InputLabel,
    FormControl,
    DialogActions,
    Button,
    IconButton
} from "@mui/material";

import { units } from "@/components/Product/ProductModal/ProductModal";
import { Delete } from "@mui/icons-material";

export interface ProductFieldType extends Omit<ProductType, 'isTool'> {
    inputValue?: string;
    isTool: number;
}

const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & { key: any; },
    option: ProductFieldType
) => {
    const { key, ...optionProps } = props;
    return (
        <li key={key} {...optionProps}>
            {option.name}
        </li>
    );
}

// if loading, show a loading spinner
const renderInput = (params: AutocompleteRenderInputParams, loading: boolean) => {
    return <TextField {...params} label={loading ? 'Loading...' : 'Product'} />
}

export default function ProductField({ onChange }: { onChange: (data: any) => void }) {

    const controller = useProductFieldController();

    useEffect(() => {
        onChange(controller.value);
    }, [controller.value]);

    return (
        <Fragment>
            <Autocomplete
                value={controller.value}
                onChange={controller.changeValueHandler}
                filterOptions={controller.filterOptionsHandler}
                options={controller.productOptions}
                getOptionLabel={controller.getOptionLabelHandler}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={renderOption}
                freeSolo
                renderInput={(params) => renderInput(params, controller.loading)}
                disabled={controller.loading}
            />
            <Dialog 
                open={controller.open} 
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add a new product to the system</DialogContentText>
                    <Grid container spacing={2} marginTop={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="Product Name"
                                value={controller.dialogValue.name}
                                onChange={(e) => controller.setDialogValue({ ...controller.dialogValue, name: e.target.value })}
                            />
                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel id="is-tool-label">Is Tool</InputLabel>
                                <Select
                                    required
                                    labelId="is-tool-label"
                                    label="Is Tool"
                                    value={controller.dialogValue.isTool}
                                    onChange={(e) => controller.handleIsToolChange(Number(e.target.value))} // Usar la nueva función
                                >
                                    <MenuItem value={1}>Yes</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel id="unit-label">Unit</InputLabel>
                                <Select
                                    required
                                    labelId="unit-label"
                                    label="Unit"
                                    value={controller.dialogValue.unit}
                                    disabled={controller.dialogValue.isTool === 1} // Desactivar cuando isTool es true
                                    onChange={(e) => controller.setDialogValue({ ...controller.dialogValue, unit: e.target.value })}
                                >
                                    {units.map((unit) => (
                                        <MenuItem key={unit.id} value={unit.name}>{unit.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={controller.handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        loading={controller.loading}
                        onClick={controller.handleSubmit}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

