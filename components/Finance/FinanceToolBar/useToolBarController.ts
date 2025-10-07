import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { FinanceContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";


export default function useToolBarController(financeContext: FinanceContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/finance`, {
                data: {
                    ids: Array.from(financeContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            financeContext.setFinance(prev => prev.filter(item => !financeContext.rowSelected.ids.has(item.id)));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Finance Items',
            message: 'Are you sure you want to delete these finance items?',
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

    const handleAddFinance = () => {
        financeContext.setModal({ open: true, type: 'add', finance: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddFinance,
    }
}