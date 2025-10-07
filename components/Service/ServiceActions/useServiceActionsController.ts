import { ServiceContextType } from "../ContextProvider";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useServiceActionsController(context: ServiceContextType, params: GridRenderCellParams) {
    const uiContext = useUIDisplayControls();

    const updateHandler = () => {
        context.setModal({ open: true, type: 'update', service: params.row });
    }

    const deleteHandler = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Service',
            message: 'Are you sure you want to delete this service?',
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

                            await api.delete(`/service/${params.row.id}`);
                            
                            context.setServices(context.services.filter((service: any) => service.id !== params.row.id));
                            uiContext.setAlert(prev => ({ ...prev, open: false }))
                            uiContext.setSnackbar({ open: true, message: 'Service deleted successfully', severity: 'success' })
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
