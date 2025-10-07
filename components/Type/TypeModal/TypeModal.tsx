// Type Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useTypeContext } from "../ContextProvider";
import useTypeModalController from "./useTypeModalController";

export default function TypeModal() {
    const typeContext = useTypeContext();
    const controller = useTypeModalController();

    return (
        <>
            <Dialog
                open={typeContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{typeContext.modal.type === 'add' ? 'Add Type' : 'Update Type'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{typeContext.modal.type === 'add' ? 'Add a new type to the system' : 'Update the type information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2}>
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
                            {typeContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
