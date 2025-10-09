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
                <DialogTitle>{usersContext.modal.type === 'add' ? 'Agregar usuario' : 'Actualizar usuario'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{usersContext.modal.type === 'add' ? 'Agregar un nuevo usuario al sistema' : 'Actualizar la información del usuario'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2} >
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Nombre"
                                fullWidth
                                value={controller.formData.name.value}
                                onChange={(e) => controller.setName(e.target.value)}
                                error={!!controller.formData.name.error}
                                helperText={controller.formData.name.error}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Apellido"
                                fullWidth
                                value={controller.formData.lastname.value}
                                onChange={(e) => controller.setLastname(e.target.value)}
                                error={!!controller.formData.lastname.error}
                                helperText={controller.formData.lastname.error}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Teléfono"
                                fullWidth
                                value={controller.formData.phone.value}
                                onChange={(e) => controller.setPhone(e.target.value)}
                                type="tel"
                                error={!!controller.formData.phone.error}
                                helperText={controller.formData.phone.error}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Dirección"
                                fullWidth
                                value={controller.formData.address.value}
                                onChange={(e) => controller.setAddress(e.target.value)}
                                error={!!controller.formData.address.error}
                                helperText={controller.formData.address.error}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Correo"
                                fullWidth
                                value={controller.formData.email.value}
                                onChange={(e) => controller.setEmail(e.target.value)}
                                type="email"
                                error={!!controller.formData.email.error}
                                helperText={controller.formData.email.error}
                            />
                        </Grid>
                        {usersContext.modal.type === 'add' && <Grid size={6}>
                            <TextField
                                required
                                margin="dense"
                                label="Contraseña"
                                fullWidth
                                value={controller.formData.password.value}
                                onChange={(e) => controller.setPassword(e.target.value)}
                                type="password"
                                error={!!controller.formData.password.error}
                                helperText={controller.formData.password.error}
                            />
                        </Grid>}
                    </Grid>
                    <DialogActions>
                        <Button
                            disabled={controller.loading}
                            onClick={controller.handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button loading={controller.loading} onClick={controller.handleSubmit}>
                            {usersContext.modal.type === 'add' ? 'Agregar' : 'Actualizar'}
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
                <DialogTitle>Asignar Rol</DialogTitle>
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
                    <Button disabled={controller.loading} onClick={controller.handleClose}>Cancelar</Button>
                    <Button loading={controller.loading} onClick={controller.handleUpdateUserRoles}>Asignar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}