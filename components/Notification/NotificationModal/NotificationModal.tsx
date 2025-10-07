// Notification Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNotificationContext } from "../ContextProvider";
import useNotificationModalController from "./useNotificationModalController";

export default function NotificationModal() {
    const notificationsContext = useNotificationContext();
    const controller = useNotificationModalController();

    return (
        <Dialog
            open={notificationsContext.modal.open}
            onClose={controller.handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{notificationsContext.modal.type === 'add' ? 'Add Notification' : 'Update Notification'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{notificationsContext.modal.type === 'add' ? 'Add a new notification to the system' : 'Update the notification information'}</DialogContentText>
                <Grid container rowSpacing={0} columnSpacing={2} >
                    <Grid size={12}>
                        <TextField
                            required
                            margin="dense"
                            label="Title"
                            fullWidth
                            value={controller.formData.title}
                            onChange={(e) => controller.setFormData({ ...controller.formData, title: e.target.value })}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            required
                            margin="dense"
                            label="Message"
                            fullWidth
                            multiline
                            rows={3}
                            value={controller.formData.message}
                            onChange={(e) => controller.setFormData({ ...controller.formData, message: e.target.value })}
                        />
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={controller.formData.type}
                                onChange={(e) => controller.setFormData({ ...controller.formData, type: e.target.value })}
                            >
                                <MenuItem value="info">Info</MenuItem>
                                <MenuItem value="warning">Warning</MenuItem>
                                <MenuItem value="error">Error</MenuItem>
                                <MenuItem value="success">Success</MenuItem>
                            </Select>
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
                        {notificationsContext.modal.type === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
