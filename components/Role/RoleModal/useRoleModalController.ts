import { useEffect, useState } from "react";
import { useRoleContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: ''
}

export default function useRoleModalController() {

    const roleContext = useRoleContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateRole = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/role/${id}`, {
                ...data
            });

            roleContext.setRoles(prev => prev.map(role => role.id === Number(id) ? response.data : role));
            setFormData(initialFormData);
            roleContext.setModal({ open: false, type: 'add', role: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addRole = async (data: any) => {
        try {
            const response = await api.post(`/role`, {
                ...data
            });
            
            roleContext.setRoles([...roleContext.roles, response.data]);
            setFormData(initialFormData);
            roleContext.setModal({ open: false, type: 'add', role: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        roleContext.setModal({ open: false, type: 'add', role: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (roleContext.modal.type === 'add') {
                await addRole(formData);
                uiContext.setSnackbar({ open: true, message: 'Role added successfully', severity: 'success' });
            } else {
                await updateRole(roleContext.modal.role.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Role updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating role', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (roleContext.modal.role) {
            setFormData(roleContext.modal.role);
        }
    }, [roleContext.modal.role]);

    return {
        formData,
        setFormData,
        updateRole,
        addRole,
        handleClose,
        handleSubmit,
        loading
    }
}
