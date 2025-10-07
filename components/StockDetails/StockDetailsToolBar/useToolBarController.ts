import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { StockDetailsContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";


export default function useToolBarController(stockDetailsContext: StockDetailsContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/stock/${stockDetailsContext.stockId}/details`, {
                data: {
                    ids: Array.from(stockDetailsContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            stockDetailsContext.setDetails(prev => prev.filter(detail => !stockDetailsContext.rowSelected.ids.has(detail.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Stock Details',
            message: 'Are you sure you want to delete these stock details?',
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

    const handleAddStockDetail = () => {
        stockDetailsContext.setModal({ open: true, type: 'add', detail: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddStockDetail,
    }
}
