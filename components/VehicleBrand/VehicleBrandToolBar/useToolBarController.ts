import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { VehicleBrandContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";


export default function useToolBarController(vehicleBrandContext: VehicleBrandContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/service/vehicle/brand`, {
                data: {
                    ids: Array.from(vehicleBrandContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            vehicleBrandContext.setVehicleBrands(prev => prev.filter(brand => !vehicleBrandContext.rowSelected.ids.has(brand.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Vehicle Brands',
            message: 'Are you sure you want to delete these vehicle brands?',
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

    const handleAddVehicleBrand = () => {
        vehicleBrandContext.setModal({ open: true, type: 'add', vehicleBrand: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddVehicleBrand,
    }
}
