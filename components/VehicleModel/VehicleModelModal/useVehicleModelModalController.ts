import { useEffect, useState } from "react";
import { useVehicleModelContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: ''
}

export default function useVehicleModelModalController() {

    const vehicleModelContext = useVehicleModelContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);


    const updateVehicleModel = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/service/vehicle/model/${id}`, {
                ...data
            });

            vehicleModelContext.setVehicleModels(prev => prev.map(model => model.id === Number(id) ? response.data : model));
            setFormData(initialFormData);
            vehicleModelContext.setModal({ open: false, type: 'add', vehicleModel: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addVehicleModel = async (data: any) => {
        try {
            const response = await api.post(`/service/vehicle/model`, {
                ...data
            });
            
            vehicleModelContext.setVehicleModels([...vehicleModelContext.vehicleModels, response.data]);
            setFormData(initialFormData);
            vehicleModelContext.setModal({ open: false, type: 'add', vehicleModel: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        vehicleModelContext.setModal({ open: false, type: 'add', vehicleModel: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (vehicleModelContext.modal.type === 'add') {
                await addVehicleModel(formData);
                uiContext.setSnackbar({ open: true, message: 'Vehicle model added successfully', severity: 'success' });
            } else {
                await updateVehicleModel(vehicleModelContext.modal.vehicleModel.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Vehicle model updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating vehicle model', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (vehicleModelContext.modal.vehicleModel) {
            if (vehicleModelContext.modal.type === 'edit') {
                setFormData(vehicleModelContext.modal.vehicleModel);
            }
        }
    }, [vehicleModelContext.modal.vehicleModel]);


    return {
        formData,
        setFormData,
        updateVehicleModel,
        addVehicleModel,
        handleClose,
        handleSubmit,
        loading
    }
}
