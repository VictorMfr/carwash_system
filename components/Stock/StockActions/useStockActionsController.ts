import { StockContextType } from "../ContextProvider";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useEffect } from "react";

export default function useStockActionsController(context: StockContextType, params: GridRenderCellParams) {
    const uiContext = useUIDisplayControls();
    const router = useRouter();

    const viewDetailsHandler = () => {
        router.push(`/dashboard/stock/${params.row.id}`);
    }

    const updateHandler = () => {
        context.setModal({ open: true, type: 'edit', stock: params.row });
    }

    const deleteHandler = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Stock',
            message: 'Are you sure you want to delete this stock?',
            severity: 'warning',
            actions: [
                {
                    label: 'Cancel',
                    onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
                },
                {
                    label: 'Delete',
                    onClick: async () => {
                        try {
                            uiContext.setLoading(true);

                            await api.delete(`/api/stock/${params.row.id}`);
                            
                            context.setStocks(context.stocks.filter((stock: any) => stock.id !== params.row.id));
                            uiContext.setAlert(prev => ({ ...prev, open: false }))
                            uiContext.setSnackbar({ open: true, message: 'Stock deleted successfully', severity: 'success' })
                        } catch (error) {
                            handleApiError(error, uiContext);
                        } finally {
                            uiContext.setLoading(false);
                        }
                    }
                }
            ]
        })
    }

    return {
        viewDetailsHandler,
        updateHandler,
        deleteHandler
    }
}
