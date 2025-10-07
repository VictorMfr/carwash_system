// VehicleModel Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useVehicleModelContext } from "../ContextProvider";
import useVehicleModelModalController from "./useVehicleModelModalController";

export default function VehicleModelModal() {
    const vehicleModelContext = useVehicleModelContext();
    const controller = useVehicleModelModalController();

    return (
        <>
            <Dialog
                open={vehicleModelContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{vehicleModelContext.modal.type === 'add' ? 'Add Vehicle Model' : 'Update Vehicle Model'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{vehicleModelContext.modal.type === 'add' ? 'Add a new vehicle model to the system' : 'Update the vehicle model information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                margin="dense"
                                label="Model Name"
                                fullWidth
                                value={controller.formData.name}
                                onChange={(e) => controller.setFormData({ ...controller.formData, name: e.target.value })}
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
                            {vehicleModelContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
