import { VehicleContextType } from "../ContextProvider";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useVehicleActionsController(context: VehicleContextType, params: GridRenderCellParams) {
    const uiContext = useUIDisplayControls();

    const updateHandler = () => {
        context.setModal({ open: true, type: 'edit', vehicle: params.row });
    }

    const deleteHandler = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Vehicle',
            message: 'Are you sure you want to delete this vehicle?',
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

                            await api.delete(`/service/vehicle/${params.row.id}`);
                            
                            context.setVehicles(context.vehicles.filter((vehicle: any) => vehicle.id !== params.row.id));
                            uiContext.setAlert(prev => ({ ...prev, open: false }))
                            uiContext.setSnackbar({ open: true, message: 'Vehicle deleted successfully', severity: 'success' })
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
