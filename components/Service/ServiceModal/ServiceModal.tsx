// Service Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Box, Chip } from "@mui/material";
import { useServiceContext } from "../ContextProvider";
import useServiceModalController from "./useServiceModalController";
import useFetchRecipes from "@/hooks/fetch/useFetchRecipes";
import useFetchOperators from "@/hooks/fetch/useFetchOperators";
import useFetchVehicles from "@/hooks/fetch/useFetchVehicles";
import useFetchStockDetails from "@/hooks/fetch/useFetchStockDetails";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function ServiceModal() {
    const servicesContext = useServiceContext();
    const controller = useServiceModalController();
    const { recipes } = useFetchRecipes();
    const { operators } = useFetchOperators();
    const { vehicles } = useFetchVehicles();
    const { details } = useFetchStockDetails();

    return (
        <>
            <Dialog
                open={servicesContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{servicesContext.modal.type === 'add' ? 'Add Service' : 'Update Service'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{servicesContext.modal.type === 'add' ? 'Add a new service to the system' : 'Update the service information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid size={12}>
                            <TextField 
                                required 
                                margin="dense" 
                                label="Date" 
                                type="date" 
                                fullWidth 
                                value={controller.formData.date} 
                                onChange={(e) => controller.handleDateChange(e.target.value)} 
                                InputLabelProps={{ shrink: true }} 
                            />
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth margin="dense" required>
                                <InputLabel>Recipe</InputLabel>
                                <Select
                                    value={controller.formData.recipeId || ''}
                                    onChange={(e) => controller.handleRecipeChange(Number(e.target.value) || null)}
                                    input={<OutlinedInput label="Recipe" />}
                                >
                                    {recipes.map((recipe: any) => (
                                        <MenuItem key={recipe.id} value={recipe.id}>
                                            {recipe.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth margin="dense" required>
                                <InputLabel>Vehicle</InputLabel>
                                <Select
                                    value={controller.formData.vehicleId || ''}
                                    onChange={(e) => controller.handleVehicleChange(Number(e.target.value) || null)}
                                    input={<OutlinedInput label="Vehicle" />}
                                >
                                    {vehicles.map((vehicle: any) => (
                                        <MenuItem key={vehicle.id} value={vehicle.id}>
                                            {vehicle.plate} - {vehicle.VehicleBrand?.name} {vehicle.Model?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Operators</InputLabel>
                                <Select
                                    multiple
                                    value={controller.formData.operatorIds}
                                    onChange={(e) => controller.handleOperatorChange(e.target.value as number[])}
                                    input={<OutlinedInput label="Operators" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => {
                                                const operator = operators.find((op: any) => op.id === value);
                                                return (
                                                    <Chip 
                                                        key={value} 
                                                        label={operator ? `${operator.name} ${operator.lastname}` : value} 
                                                    />
                                                );
                                            })}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {operators.map((operator: any) => (
                                        <MenuItem key={operator.id} value={operator.id}>
                                            {operator.name} {operator.lastname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Stock Details</InputLabel>
                                <Select
                                    multiple
                                    value={controller.formData.stockDetailIds}
                                    onChange={(e) => controller.handleStockDetailChange(e.target.value as number[])}
                                    input={<OutlinedInput label="Stock Details" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => {
                                                const stockDetail = details.find((sd: any) => sd.id === value);
                                                return (
                                                    <Chip 
                                                        key={value} 
                                                        label={stockDetail ? `Qty: ${stockDetail.quantity}` : value} 
                                                    />
                                                );
                                            })}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {details.map((stockDetail: any) => (
                                        <MenuItem key={stockDetail.id} value={stockDetail.id}>
                                            Qty: {stockDetail.quantity} - Price: ${stockDetail.price}
                                        </MenuItem>
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
                            {servicesContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
