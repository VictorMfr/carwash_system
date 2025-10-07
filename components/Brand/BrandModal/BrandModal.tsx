// Brand Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useBrandContext } from "../ContextProvider";
import useBrandModalController from "./useBrandModalController";

export default function BrandModal() {
    const brandContext = useBrandContext();
    const controller = useBrandModalController();

    return (
        <Dialog
            open={brandContext.modal.open}
            onClose={controller.handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{brandContext.modal.type === 'add' ? 'Add Brand' : 'Update Brand'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{brandContext.modal.type === 'add' ? 'Add a new brand to the system' : 'Update the brand information'}</DialogContentText>
                <Grid container rowSpacing={0} columnSpacing={2} >
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
                        {brandContext.modal.type === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
