import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { VehicleModelContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";


export default function useToolBarController(vehicleModelContext: VehicleModelContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/service/vehicle/model`, {
                data: {
                    ids: Array.from(vehicleModelContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            vehicleModelContext.setVehicleModels(prev => prev.filter(model => !vehicleModelContext.rowSelected.ids.has(model.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Vehicle Models',
            message: 'Are you sure you want to delete these vehicle models?',
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

    const handleAddVehicleModel = () => {
        vehicleModelContext.setModal({ open: true, type: 'add', vehicleModel: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddVehicleModel,
    }
}
