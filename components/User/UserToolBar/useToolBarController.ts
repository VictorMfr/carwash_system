import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { UserContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";


export default function useToolBarController(usersContext: UserContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/user`, {
                data: {
                    ids: Array.from(usersContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            usersContext.setUsers(prev => prev.filter(user => !usersContext.rowSelected.ids.has(user.id)));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Users',
            message: 'Are you sure you want to delete these users?',
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

    const handleAddUser = () => {
        usersContext.setModal({ open: true, type: 'add', user: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddUser,
    }
}