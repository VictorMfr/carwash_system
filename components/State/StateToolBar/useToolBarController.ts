import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { StateContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";


export default function useToolBarController(stateContext: StateContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/stock/state`, {
                data: {
                    ids: Array.from(stateContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            stateContext.setStates(prev => prev.filter(state => !stateContext.rowSelected.ids.has(state.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many States',
            message: 'Are you sure you want to delete these states?',
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

    const handleAddState = () => {
        stateContext.setModal({ open: true, type: 'add', state: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddState,
    }
}
