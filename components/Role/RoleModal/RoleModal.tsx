// Role Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useRoleContext } from "../ContextProvider";
import useRoleModalController from "./useRoleModalController";

export default function RoleModal() {
    const roleContext = useRoleContext();
    const controller = useRoleModalController();

    return (
        <>
            <Dialog
                open={roleContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{roleContext.modal.type === 'add' ? 'Add Role' : 'Update Role'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{roleContext.modal.type === 'add' ? 'Add a new role to the system' : 'Update the role information'}</DialogContentText>
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
                    </Grid>
                    <DialogActions>
                        <Button
                            disabled={controller.loading}
                            onClick={controller.handleClose}
                        >
                            Cancel
                        </Button>
                        <Button loading={controller.loading} onClick={controller.handleSubmit}>
                            {roleContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
