// Client Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useClientContext } from "../ContextProvider";
import useClientModalController from "./useClientModalController";

export default function ClientModal() {
    const clientContext = useClientContext();
    const controller = useClientModalController();

    return (
        <Dialog
            open={clientContext.modal.open}
            onClose={controller.handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{clientContext.modal.type === 'add' ? 'Add Client' : 'Update Client'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{clientContext.modal.type === 'add' ? 'Add a new client to the system' : 'Update the client information'}</DialogContentText>
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
                    <Grid size={12}>
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
                </Grid>
                <DialogActions>
                    <Button
                        disabled={controller.loading}
                        onClick={controller.handleClose}
                    >
                        Cancel
                    </Button>
                    <Button loading={controller.loading} onClick={controller.handleSubmit}>
                        {clientContext.modal.type === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
