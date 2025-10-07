import { OperatorContextType } from "../ContextProvider";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useOperatorActionsController(context: OperatorContextType, params: GridRenderCellParams) {
    const uiContext = useUIDisplayControls();

    const updateHandler = () => {
        context.setModal({ open: true, type: 'edit', operator: params.row });
    }

    const deleteHandler = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Operator',
            message: 'Are you sure you want to delete this operator?',
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

                            await api.delete(`/service/operator/${params.row.id}`);
                            
                            context.setOperators(context.operators.filter((operator: any) => operator.id !== params.row.id));
                            uiContext.setAlert(prev => ({ ...prev, open: false }))
                            uiContext.setSnackbar({ open: true, message: 'Operator deleted successfully', severity: 'success' })
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
        updateHandler,
        deleteHandler
    }
}
