import ProductField from "@/components/Stock/StockForm/Product/ProductField";
import { Button, Chip, Grid, IconButton, Paper, TextField } from "@mui/material";
import { Close, Save } from "@mui/icons-material";
import useExtraFieldController from "./useExtraFieldController";

export default function ExtraField({ onChange }: { onChange: (items: any[]) => void }) {
    const controller = useExtraFieldController();

    const handleSave = () => {
        onChange(controller.cart);
    };
    

    return (
        
            <Grid container spacing={1} sx={{ mt: 1 }}>
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
                        sx={{ height: '100%' }}
                        variant="contained"
                        onClick={controller.handleAddToCart}
                    >Agregar</Button>
                </Grid>
                <Grid size={12}>
                    <Grid container spacing={1}>
                        {controller.cart.map((item) => (
                            <Grid key={item.productId}>
                                <Chip
                                    variant="outlined"
                                    key={item.productId}
                                    label={`${item.productName} - ${item.quantity}${item.unit}`}
                                    onDelete={() => controller.handleRemoveFromCart(item.productId)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

    );
}


