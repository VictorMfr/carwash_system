import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { StockContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";


export default function useToolBarController(stockContext: StockContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/stock`, {
                data: {
                    ids: Array.from(stockContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            stockContext.setStocks(prev => prev.filter(stock => !stockContext.rowSelected.ids.has(stock.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Stocks',
            message: 'Are you sure you want to delete these stocks?',
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

    const handleAddStock = () => {
        stockContext.setModal({ open: true, type: 'add', stock: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddStock,
    }
}
