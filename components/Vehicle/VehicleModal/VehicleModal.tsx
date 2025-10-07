// Vehicle Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useVehicleContext } from "../ContextProvider";
import useVehicleModalController from "./useVehicleModalController";

export default function VehicleModal() {
    const vehicleContext = useVehicleContext();
    const controller = useVehicleModalController();

    return (
        <>
            <Dialog
                open={vehicleContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{vehicleContext.modal.type === 'add' ? 'Add Vehicle' : 'Update Vehicle'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{vehicleContext.modal.type === 'add' ? 'Add a new vehicle to the system' : 'Update the vehicle information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                margin="dense"
                                label="License Plate"
                                fullWidth
                                value={controller.formData.license_plate}
                                onChange={(e) => controller.setFormData({ ...controller.formData, license_plate: e.target.value })}
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
                            {vehicleContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
