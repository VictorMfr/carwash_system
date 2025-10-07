import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { ClientContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";


export default function useToolBarController(clientContext: ClientContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/service/client`, {
                data: {
                    ids: Array.from(clientContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            clientContext.setClients(prev => prev.filter(client => !clientContext.rowSelected.ids.has(client.id)));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Clients',
            message: 'Are you sure you want to delete these clients?',
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

    const handleAddClient = () => {
        clientContext.setModal({ open: true, type: 'add', client: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddClient,
    }
}
