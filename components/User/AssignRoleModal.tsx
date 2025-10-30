import useFetch from "@/hooks/fetch/useFetch";
import { Role } from "@/services/backend/models/associations";
import { Button, Checkbox, ListItemText } from "@mui/material";

import { CircularProgress, DialogActions, DialogContent, DialogTitle, List, ListItem } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";

const AssignRoleModal = ({ 
    setActionModal, 
    params 
}: { 
    setActionModal: (actionModal: { open: boolean, action: any }) => void, 
    params: GridRenderCellParams 
}) => {

    const uiContext = useUIDisplayControls();
    const { data, loading } = useFetch(`/api/role`);
    const { data: userRoles, loading: userRolesLoading } = useFetch(`/api/user/${params.row.id}/role`);
    
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (!userRolesLoading && Array.isArray(userRoles) && selectedRoles.length === 0) {
            setSelectedRoles((userRoles as Role[]).map((role) => role.id.toString()))
        }
    }, [userRolesLoading, userRoles, selectedRoles.length]);

    const handleClose = () => {
        setSelectedRoles([]);
        setActionModal({ open: false, action: null });
    }

    const handleUpdateUserRoles = async () => {
        try {
            setSubmitLoading(true);
            await api.put(`/api/user/${params.row.id}/role`, { roles: selectedRoles });
            setSelectedRoles([]);
            handleClose();
            uiContext.setSnackbar({ open: true, message: 'Roles updated successfully', severity: 'success' });
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setSubmitLoading(false);
        }
    }

    return (
        <Fragment>
            <DialogTitle>Asignar Rol</DialogTitle>
            <DialogContent>
                <List >
                    {loading ? (
                        <CircularProgress
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                margin: 'auto'
                            }}
                        />) : data.map((role: Role) => (
                            <ListItem key={role.name} secondaryAction={
                                <Checkbox
                                    checked={selectedRoles.includes(role.id.toString())}
                                    onChange={(e) => setSelectedRoles(prev => (
                                        e.target.checked
                                            ? Array.from(new Set([...prev, role.id.toString()]))
                                            : prev.filter(r => r !== role.id.toString())
                                    ))}
                                />
                            }>
                                <ListItemText primary={role.name} />
                            </ListItem>
                        ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} onClick={handleClose}>Cancelar</Button>
                <Button loading={submitLoading} onClick={handleUpdateUserRoles}>Asignar</Button>
            </DialogActions>
        </Fragment>
    )
}

export default withUIDisplayControls(AssignRoleModal);