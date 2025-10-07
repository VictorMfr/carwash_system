// VehicleBrand Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useVehicleBrandContext } from "../ContextProvider";
import useVehicleBrandModalController from "./useVehicleBrandModalController";

export default function VehicleBrandModal() {
    const vehicleBrandContext = useVehicleBrandContext();
    const controller = useVehicleBrandModalController();

    return (
        <>
            <Dialog
                open={vehicleBrandContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{vehicleBrandContext.modal.type === 'add' ? 'Add Vehicle Brand' : 'Update Vehicle Brand'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{vehicleBrandContext.modal.type === 'add' ? 'Add a new vehicle brand to the system' : 'Update the vehicle brand information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                margin="dense"
                                label="Brand Name"
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
                            {vehicleBrandContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
