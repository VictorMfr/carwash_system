// Account Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useAccountContext } from "../ContextProvider";
import useAccountModalController from "./useAccountModalController";

export default function AccountModal() {
    const accountContext = useAccountContext();
    const controller = useAccountModalController();

    return (
        <Dialog
            open={accountContext.modal.open}
            onClose={controller.handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{accountContext.modal.type === 'add' ? 'Add Account' : 'Update Account'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{accountContext.modal.type === 'add' ? 'Add a new account to the system' : 'Update the account information'}</DialogContentText>
                <Grid container rowSpacing={0} columnSpacing={2} >
                    <Grid size={12}>
                        <TextField
                            required
                            margin="dense"
                            label="Name"
                            fullWidth
                            value={controller.formData.name}
                            onChange={(e) => controller.setFormData({ ...controller.formData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            required
                            margin="dense"
                            label="Description"
                            fullWidth
                            value={controller.formData.description}
                            onChange={(e) => controller.setFormData({ ...controller.formData, description: e.target.value })}
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
                        {accountContext.modal.type === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
