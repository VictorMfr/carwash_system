import { FormDataField } from "@/types/form/form";
import { Avatar, Button, Dialog, DialogContent, FormHelperText, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import AutoCompleteField from "../AutoComplete";
import NumberField from "../Number";
import useInputController from "../InputController";
import { useModuleFormContext } from "../../context";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormInput } from "../../FormDataController";

export default function CartField({ 
    dataField,
    onChange,
    innerValue
 }: { 
    dataField: FormDataField;
    onChange?: (cart: any[]) => void;
    innerValue?: any;
}) {

    const { value, error, disabled } = useInputController({ dataField });
    const [cart, setCart] = useState<any[]>(innerValue ?? (Array.isArray(value) ? value : []));
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(0);
    const [productError, setProductError] = useState<string>('');
    const [quantityError, setQuantityError] = useState<string>('');
    const formCtx = useModuleFormContext();
    const [preview, setPreview] = useState<{ open: boolean; src: string; alt: string }>({ open: false, src: '', alt: '' });

    useEffect(() => {
        setCart(innerValue ?? (Array.isArray(value) ? value : []));
    }, [innerValue, value]);


    const changeCartHandler = () => {
        // Local validations
        let hasError = false;
        if (!product) {
            setProductError('Debe seleccionar un producto');
            hasError = true;
        }
        if (quantity === null || quantity === undefined || Number(quantity) <= 0) {
            setQuantityError('La cantidad debe ser mayor que 0');
            hasError = true;
        }
        if (hasError) return;

        const current = Array.isArray(cart) ? cart : [];
        const productId = product.id ?? product.value ?? JSON.stringify(product);
        const next = [...current];
        const idx = next.findIndex((item: any) => (item.product?.id ?? item.product?.value ?? JSON.stringify(item.product)) === productId);
        if (idx >= 0) {
            next[idx] = { ...next[idx], quantity: Number(next[idx].quantity) + Number(quantity) };
        } else {
            next.push({ product, quantity });
        }

        // First update local cart, then form state
        setCart(next);
        formCtx.setFormValue(prev => prev.map(input => input.field === dataField.field ? ({ ...input, value: next as any, error: '' } as FormInput) : input));

        // Reset local controls and errors
        setProduct(null);
        setQuantity(0);
        setProductError('');
        setQuantityError('');
        onChange?.(next);
    }

    const changeProductHandler = (value: any) => {
        setProduct(value);
        if (value) setProductError('');
    }

    const changeQuantityHandler = (value: number) => {
        setQuantity(value);
        if (value && Number(value) > 0) setQuantityError('');
    }

    const removeItem = (index: number) => {
        const next = (cart ?? []).filter((_, i) => i !== index);
        setCart(next);
        formCtx.setFormValue(state => state.map(input => input.field === dataField.field ? ({ ...input, value: next as any } as FormInput) : input));
        onChange?.(next);
    }

    const openPreview = (src: string, alt: string) => setPreview({ open: true, src, alt });
    const closePreview = () => setPreview(prev => ({ ...prev, open: false }));

    const labelKey = dataField.inputConfig?.cart?.autocomplete.inputConfig.autocomplete?.labelField || 'name';


    return (
        <Grid container spacing={1} size={12}>
            {dataField.inputConfig.cart?.optional && (
                <Grid size={12}>
                    <Typography variant="caption">{`(${dataField.inputConfig.cart?.optional})`}</Typography>
                </Grid>
            )}
            <Grid size={{ xs: 6, md: 4 }}>
                <AutoCompleteField
                    dataField={dataField.inputConfig?.cart!.autocomplete}
                    onChange={changeProductHandler}
                    innerValue={product}
                />
                <FormHelperText error={!!productError}>{productError}</FormHelperText>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
                <NumberField
                    dataField={dataField.inputConfig?.cart!.number}
                    onChange={changeQuantityHandler}
                    innerValue={quantity}
                />
                <FormHelperText error={!!quantityError}>{quantityError}</FormHelperText>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ height: 55 }}
                    onClick={changeCartHandler}
                    disabled={disabled}
                >
                    Agregar
                </Button>
            </Grid>
            <Grid size={12}>
                <List dense>
                    {(cart ?? []).map((item, index) => (
                        <ListItem key={index} divider secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => removeItem(index)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <Stack direction="row" alignItems="center" gap={1}>
                                {item.product.picture && <ListItemAvatar>
                                    <Tooltip title="Ver imagen">
                                        <Avatar
                                            variant="rounded"
                                            src={item.product.picture}
                                            alt={item.product.name}
                                            sx={{ width: 50, height: 50, cursor: 'zoom-in' }}
                                            onClick={() => openPreview(item.product.picture, item.product.name)}
                                        />
                                    </Tooltip>
                                </ListItemAvatar>}
                                <ListItemText
                                    primary={item.product?.[labelKey] ?? item.product?.label ?? 'Producto'}
                                    secondary={`Cantidad: ${item.quantity}`}
                                />
                            </Stack>
                        </ListItem>
                    ))}
                    {!cart?.length && (
                        <Typography variant="body2" color="text.secondary">Sin productos en el carrito</Typography>
                    )}
                </List>
            </Grid>
            <Dialog open={preview.open} onClose={closePreview} maxWidth="sm" fullWidth>
                <DialogContent sx={{ p: 0 }}>
                    <img src={preview.src} alt={preview.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </DialogContent>
            </Dialog>
            <FormHelperText error={!!error}>{error}</FormHelperText>
        </Grid>
    )
}