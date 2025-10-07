// Operator Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useOperatorContext } from "../ContextProvider";
import useOperatorModalController from "./useOperatorModalController";

export default function OperatorModal() {
    const operatorContext = useOperatorContext();
    const controller = useOperatorModalController();

    return (
        <>
            <Dialog
                open={operatorContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{operatorContext.modal.type === 'add' ? 'Add Operator' : 'Update Operator'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{operatorContext.modal.type === 'add' ? 'Add a new operator to the system' : 'Update the operator information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2} >
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Name"
                                fullWidth
                                value={controller.formData.name}
                                onChange={(e) => controller.setFormData({ ...controller.formData, name: e.target.value })}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Last Name"
                                fullWidth
                                value={controller.formData.lastname}
                                onChange={(e) => controller.setFormData({ ...controller.formData, lastname: e.target.value })}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Phone"
                                fullWidth
                                value={controller.formData.phone}
                                onChange={(e) => controller.setFormData({ ...controller.formData, phone: e.target.value })}
                                type="tel"
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Address"
                                fullWidth
                                value={controller.formData.address}
                                onChange={(e) => controller.setFormData({ ...controller.formData, address: e.target.value })}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                margin="dense"
                                label="Avatar URL"
                                fullWidth
                                value={controller.formData.avatar}
                                onChange={(e) => controller.setFormData({ ...controller.formData, avatar: e.target.value })}
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
                            {operatorContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
