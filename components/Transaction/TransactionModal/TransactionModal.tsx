// Transaction Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import { useTransactionContext } from "../ContextProvider";
import useTransactionModalController from "./useTransactionModalController";

export default function TransactionModal() {
    const transactionContext = useTransactionContext();
    const controller = useTransactionModalController();

    return (
        <>
            <Dialog
                open={transactionContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{transactionContext.modal.type === 'add' ? 'Add Transaction' : 'Update Transaction'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{transactionContext.modal.type === 'add' ? 'Add a new transaction to the system' : 'Update the transaction information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid size={12}>
                            <FormControl fullWidth margin="dense" required>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={controller.formData.type || ''}
                                    onChange={(e) => controller.setFormData({ ...controller.formData, type: e.target.value })}
                                    input={<OutlinedInput label="Type" />}
                                >
                                    <MenuItem value="income">Income</MenuItem>
                                    <MenuItem value="expense">Expense</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Amount"
                                type="number"
                                fullWidth
                                value={controller.formData.amount}
                                onChange={(e) => controller.setFormData({ ...controller.formData, amount: Number(e.target.value) })}
                            />
                        </Grid>
                        <Grid size={6}>
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
                                label="Date"
                                type="date"
                                fullWidth
                                value={controller.formData.date}
                                onChange={(e) => controller.setFormData({ ...controller.formData, date: e.target.value })}
                                InputLabelProps={{ shrink: true }}
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
                            {transactionContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
