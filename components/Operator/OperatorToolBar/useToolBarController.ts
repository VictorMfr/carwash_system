import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { OperatorContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useToolBarController(operatorContext: OperatorContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/service/operator`, {
                data: {
                    ids: Array.from(operatorContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            operatorContext.setOperators(prev => prev.filter(operator => !operatorContext.rowSelected.ids.has(operator.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Operators',
            message: 'Are you sure you want to delete these operators?',
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

    const handleAddOperator = () => {
        operatorContext.setModal({ open: true, type: 'add', operator: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddOperator,
    }
}
