// Finance Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText, FormControl, InputLabel } from "@mui/material";
import { useFinanceContext } from "../ContextProvider";
import useFinanceModalController from "./useFinanceModalController";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function FinanceModal() {
    const financeContext = useFinanceContext();
    const controller = useFinanceModalController();

    return (
        <Dialog
            open={financeContext.modal.open}
            onClose={controller.handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{financeContext.modal.type === 'add' ? 'Add Finance Item' : 'Update Finance Item'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{financeContext.modal.type === 'add' ? 'Add a new finance item to the system' : 'Update the finance item information'}</DialogContentText>
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
                    <Grid size={12}>
                        <TextField
                            required
                            margin="dense"
                            label="Dolar Rate"
                            fullWidth
                            value={controller.formData.dolar_rate}
                            onChange={(e) => controller.setFormData({ ...controller.formData, dolar_rate: Number(e.target.value) })}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            required
                            margin="dense"
                            label="Amount"
                            fullWidth
                            value={controller.formData.amount}
                            onChange={(e) => controller.setFormData({ ...controller.formData, amount: Number(e.target.value) })}
                        />
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth>
                            <DatePicker
                                label="Date"
                                value={controller.formData.date}
                                onChange={(e: any) => controller.setFormData({ ...controller.formData, date: e })}
                            />
                        </FormControl>
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
                        {financeContext.modal.type === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}