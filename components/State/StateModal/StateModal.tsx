// State Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useStateContext } from "../ContextProvider";
import useStateModalController from "./useStateModalController";

export default function StateModal() {
    const stateContext = useStateContext();
    const controller = useStateModalController();

    return (
        <>
            <Dialog
                open={stateContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{stateContext.modal.type === 'add' ? 'Add State' : 'Update State'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{stateContext.modal.type === 'add' ? 'Add a new state to the system' : 'Update the state information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                margin="dense"
                                label="State Name"
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
                            {stateContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
