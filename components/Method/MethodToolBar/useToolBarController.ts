import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { MethodContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useToolBarController(methodContext: MethodContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/finance/method`, {
                data: {
                    ids: Array.from(methodContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            methodContext.setMethods(prev => prev.filter(method => !methodContext.rowSelected.ids.has(method.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Methods',
            message: 'Are you sure you want to delete these methods?',
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

    const handleAddMethod = () => {
        methodContext.setModal({ open: true, type: 'add', method: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddMethod,
    }
}
