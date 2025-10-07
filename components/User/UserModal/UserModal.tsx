// User Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText, ListItemText, ListItem, List, Checkbox, CircularProgress, InputAdornment } from "@mui/material";
import { useUserContext } from "../ContextProvider";
import useUserModalController from "./useUserModalController";
import { Role } from "@/services/backend/models/associations";

export default function UserModal() {
    const usersContext = useUserContext();
    const controller = useUserModalController();

    return (
        <>
            <Dialog
                open={usersContext.modal.open && usersContext.modal.type !== 'assignRole'}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{usersContext.modal.type === 'add' ? 'Add User' : 'Update User'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{usersContext.modal.type === 'add' ? 'Add a new user to the system' : 'Update the user information'}</DialogContentText>
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
                        <Grid size={6}>
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
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Address"
                                fullWidth
                                value={controller.formData.address}
                                onChange={(e) => controller.setFormData({ ...controller.formData, address: e.target.value })}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Email"
                                fullWidth
                                value={controller.formData.email}
                                onChange={(e) => controller.setFormData({ ...controller.formData, email: e.target.value })}
                                type="email"
                            />
                        </Grid>
                        {usersContext.modal.type === 'add' && <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Password"
                                fullWidth
                                value={controller.formData.password}
                                onChange={(e) => controller.setFormData({ ...controller.formData, password: e.target.value })}
                                type="password"
                            />
                        </Grid>}
                    </Grid>
                    <DialogActions>
                        <Button
                            disabled={controller.loading}
                            onClick={controller.handleClose}
                        >
                            Cancel
                        </Button>
                        <Button loading={controller.loading} onClick={controller.handleSubmit}>
                            {usersContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            {/* Assign Role Modal */}
            <Dialog
                open={usersContext.modal.open && usersContext.modal.type === 'assignRole'}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Assign Role</DialogTitle>
                <DialogContent>
                    <List >
                        {usersContext.loadingModal ? (
                            <CircularProgress
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    margin: 'auto'
                                }}
                            />) : controller.roles.map((role: Role) => (
                                <ListItem key={role.name} secondaryAction={
                                    <Checkbox
                                        checked={controller.selectedRoles.includes(role.id.toString())}
                                        onChange={(e) => controller.setSelectedRoles(e.target.checked ? [...controller.selectedRoles, role.id.toString()] : controller.selectedRoles.filter(r => r !== role.id.toString()))}
                                    />
                                }>
                                    <ListItemText primary={role.name} />
                                </ListItem>
                            ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button disabled={controller.loading} onClick={controller.handleClose}>Cancel</Button>
                    <Button loading={controller.loading} onClick={controller.handleUpdateUserRoles}>Assign</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}