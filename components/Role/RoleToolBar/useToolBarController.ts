import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { RoleContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useToolBarController(roleContext: RoleContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/role`, {
                data: {
                    ids: Array.from(roleContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            roleContext.setRoles(prev => prev.filter(role => !roleContext.rowSelected.ids.has(role.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Roles',
            message: 'Are you sure you want to delete these roles?',
            severity: 'warning',
            actions: [
                {
                    label: 'Cancel',
                    onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
                },
                {
                    label: 'Delete',
                    onClick: (setLoading) => handleDeletion(setLoading)
                }
            ]
        })
    }

    const handleAddRole = () => {
        roleContext.setModal({ open: true, type: 'add', role: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddRole,
    }
}
