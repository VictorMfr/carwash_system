import { useEffect, useState } from "react";
import { useVehicleBrandContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: ''
}

export default function useVehicleBrandModalController() {

    const vehicleBrandContext = useVehicleBrandContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);


    const updateVehicleBrand = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/service/vehicle/brand/${id}`, {
                ...data
            });

            vehicleBrandContext.setVehicleBrands(prev => prev.map(brand => brand.id === Number(id) ? response.data : brand));
            setFormData(initialFormData);
            vehicleBrandContext.setModal({ open: false, type: 'add', vehicleBrand: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addVehicleBrand = async (data: any) => {
        try {
            const response = await api.post(`/service/vehicle/brand`, {
                ...data
            });
            
            vehicleBrandContext.setVehicleBrands([...vehicleBrandContext.vehicleBrands, response.data]);
            setFormData(initialFormData);
            vehicleBrandContext.setModal({ open: false, type: 'add', vehicleBrand: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        vehicleBrandContext.setModal({ open: false, type: 'add', vehicleBrand: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (vehicleBrandContext.modal.type === 'add') {
                await addVehicleBrand(formData);
                uiContext.setSnackbar({ open: true, message: 'Vehicle brand added successfully', severity: 'success' });
            } else {
                await updateVehicleBrand(vehicleBrandContext.modal.vehicleBrand.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Vehicle brand updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating vehicle brand', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (vehicleBrandContext.modal.vehicleBrand) {
            if (vehicleBrandContext.modal.type === 'edit') {
                setFormData(vehicleBrandContext.modal.vehicleBrand);
            }
        }
    }, [vehicleBrandContext.modal.vehicleBrand]);


    return {
        formData,
        setFormData,
        updateVehicleBrand,
        addVehicleBrand,
        handleClose,
        handleSubmit,
        loading
    }
}
