// Marketing Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useMarketingContext } from "../ContextProvider";
import useMarketingModalController from "./useMarketingModalController";

export default function MarketingModal() {
    const marketingsContext = useMarketingContext();
    const controller = useMarketingModalController();

    return (
        <Dialog
            open={marketingsContext.modal.open}
            onClose={controller.handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{marketingsContext.modal.type === 'add' ? 'Add Marketing Item' : 'Update Marketing Item'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{marketingsContext.modal.type === 'add' ? 'Add a new marketing item to the system' : 'Update the marketing item information'}</DialogContentText>
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
                        {marketingsContext.modal.type === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
