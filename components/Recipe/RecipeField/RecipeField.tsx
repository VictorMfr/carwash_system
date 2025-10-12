import { HTMLAttributes } from "react";
import useRecipeFieldController, { RecipeFieldType } from "./useRecipeFieldController";
import ProductField from "@/components/Stock/StockForm/Product/ProductField";
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    TextField,
    Grid,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & { key: any; },
    option: RecipeFieldType
) => {
    const { key, ...optionProps } = props;
    return (
        <li key={(option as any).id ?? (option as any).inputValue ?? key} {...optionProps}>
            {option.name}
        </li>
    );
}

const renderInput = (params: AutocompleteRenderInputParams, loading: boolean) => {
    return <TextField {...params} label={loading ? 'Cargando...' : 'Receta'} />
}

export default function RecipeField({ onChange }: { onChange: (data: any) => void }) {
    const controller = useRecipeFieldController();
    // Propagate selected recipe to parent
    // Parent decides what to do with it

    

    const content = (
        <Grid container spacing={1}>
            <Autocomplete
                fullWidth
                value={controller.value}
                onChange={controller.changeValueHandler}
                filterOptions={controller.filterOptionsHandler}
                options={controller.recipeOptions}
                getOptionLabel={controller.getOptionLabelHandler}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={renderOption}
                freeSolo
                renderInput={(params) => renderInput(params, controller.loading)}
                disabled={controller.loading}
            />
            {controller.open && (
                <Grid container spacing={2} marginTop={1}>
                    <Grid size={6}>
                        <ProductField onChange={(p) => controller.setSelectedProduct(p)} />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Cantidad"
                            value={controller.quantity}
                            onChange={(e) => controller.setQuantity(parseInt(e.target.value || '0', 10))}
                        />
                    </Grid>
                    <Grid size={3}>
                        <Button
                            fullWidth
                            sx={{
                                height: '100%',
                            }}
                            variant="contained"
                            onClick={controller.handleAddToCart}>Agregar</Button>
                    </Grid>
                    <Grid size={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {controller.cart.map((item) => (
                                    <TableRow key={item.productId}>
                                        <TableCell>{item.productName}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => controller.handleRemoveFromCart(item.productId)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid size={12} display="flex" gap={1} justifyContent="flex-end">
                        <Button onClick={controller.handleCancel}>Cancelar</Button>
                        <Button onClick={controller.handleSubmit} variant="contained">Guardar</Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );

    return controller.open ? (
        <Paper sx={{ p: 2 }}>
            {content}
        </Paper>
    ) : content
}


