import { Autocomplete, Chip, Grid, TextField, Button } from "@mui/material";
import useOperatorCartController from "./useOperatorCartController";

export default function OperatorCart({ onChange }: { onChange: (items: any[]) => void }) {
    const controller = useOperatorCartController({ onChange });

    return (
        <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid size={9}>
                <Autocomplete
                    fullWidth
                    options={controller.operatorOptions}
                    loading={controller.loading}
                    value={controller.selectedOperator}
                    onChange={(_, value) => controller.setSelectedOperator(value)}
                    getOptionLabel={(option) => option ? `${option.name} ${option.lastname}` : ''}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField {...params} label={controller.loading ? 'Cargando...' : 'Operador'} />
                    )}
                />
            </Grid>
            <Grid size={3}>
                <Button
                    fullWidth
                    sx={{ height: '100%' }}
                    variant="contained"
                    onClick={controller.handleAddToCart}
                    disabled={!controller.selectedOperator}
                >Agregar</Button>
            </Grid>
            <Grid size={12}>
                <Grid container spacing={1}>
                    {controller.cart.map((item) => (
                        <Grid key={item.operatorId}>
                            <Chip
                                variant="outlined"
                                label={`${item.operatorName}`}
                                onDelete={() => controller.handleRemoveFromCart(item.operatorId)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}


