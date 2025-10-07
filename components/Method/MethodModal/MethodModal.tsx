// Method Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useMethodContext } from "../ContextProvider";
import useMethodModalController from "./useMethodModalController";

export default function MethodModal() {
    const methodContext = useMethodContext();
    const controller = useMethodModalController();

    return (
        <>
            <Dialog
                open={methodContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{methodContext.modal.type === 'add' ? 'Add Method' : 'Update Method'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{methodContext.modal.type === 'add' ? 'Add a new method to the system' : 'Update the method information'}</DialogContentText>
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
                            {methodContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
