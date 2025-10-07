import { useEffect, useState } from "react";
import { useUserContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import useFetchRoles from "@/hooks/fetch/useFetchRoles";
import { Role } from "@/services/backend/models/associations";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: '',
    lastname: '',
    phone: '',
    address: '',
    email: '',
    password: ''
}

export default function useUserModalController() {

    const usersContext = useUserContext();
    const uiContext = useUIDisplayControls();
    const { roles, loadingRoles: rolesLoading } = useFetchRoles();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);


    const updateUser = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/user/${id}`, {
                ...data
            });

            usersContext.setUsers(prev => prev.map(user => user.id === Number(id) ? response.data : user));
            setFormData(initialFormData);
            usersContext.setModal({ open: false, type: 'add', user: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addUser = async (data: any) => {
        try {
            const response = await api.post(`/api/user`, {
                ...data
            });
            
            usersContext.setUsers([...usersContext.users, response.data]);
            setFormData(initialFormData);
            usersContext.setModal({ open: false, type: 'add', user: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        usersContext.setModal({ open: false, type: 'add', user: null });
        setFormData(initialFormData);
        setSelectedRoles([]);
    }

    const handleUpdateUserRoles = async () => {
        try {
            setLoading(true);

            const response = await api.put(`/api/user/${usersContext.modal.user.id}/role`, {roles: selectedRoles});
            usersContext.setModal({ open: false, type: 'assignRole', user: null });
            uiContext.setSnackbar({ open: true, message: 'Roles updated successfully', severity: 'success' });
            setSelectedRoles([]);
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (usersContext.modal.type === 'add') {
                await addUser(formData);
                uiContext.setSnackbar({ open: true, message: 'User added successfully', severity: 'success' });
            } else {
                await updateUser(usersContext.modal.user.id, formData);
                uiContext.setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating user', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const getUserRoles = async (id: string) => {
        try {
            usersContext.setLoadingModal(true);
            const roles = await api.get(`/api/user/${id}/role`);
            setSelectedRoles(roles.data.map((role: Role) => role.id.toString()));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            usersContext.setLoadingModal(false);
        }
    }

    useEffect(() => {
        if (usersContext.modal.user) {
            if (usersContext.modal.type === 'assignRole') {
                getUserRoles(usersContext.modal.user.id);
            } else {
                setFormData(usersContext.modal.user);
            }
        }
    }, [usersContext.modal.user]);


    return {
        formData,
        setFormData,
        updateUser,
        addUser,
        handleClose,
        handleSubmit,
        loading,
        selectedRoles,
        setSelectedRoles,
        roles,
        rolesLoading,
        handleUpdateUserRoles
    }
}