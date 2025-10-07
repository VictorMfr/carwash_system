import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { VehicleContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";


export default function useToolBarController(vehicleContext: VehicleContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/service/vehicle`, {
                data: {
                    ids: Array.from(vehicleContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            vehicleContext.setVehicles(prev => prev.filter(vehicle => !vehicleContext.rowSelected.ids.has(vehicle.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Vehicles',
            message: 'Are you sure you want to delete these vehicles?',
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

    const handleAddVehicle = () => {
        vehicleContext.setModal({ open: true, type: 'add', vehicle: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddVehicle,
    }
}
