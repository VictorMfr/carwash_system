import { useEffect, useState } from "react";
import { useVehicleContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    license_plate: ''
}

export default function useVehicleModalController() {

    const vehicleContext = useVehicleContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);


    const updateVehicle = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/service/vehicle/${id}`, {
                ...data
            });

            vehicleContext.setVehicles(prev => prev.map(vehicle => vehicle.id === Number(id) ? response.data : vehicle));
            setFormData(initialFormData);
            vehicleContext.setModal({ open: false, type: 'add', vehicle: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addVehicle = async (data: any) => {
        try {
            const response = await api.post(`/service/vehicle`, {
                ...data
            });
            
            vehicleContext.setVehicles([...vehicleContext.vehicles, response.data]);
            setFormData(initialFormData);
            vehicleContext.setModal({ open: false, type: 'add', vehicle: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        vehicleContext.setModal({ open: false, type: 'add', vehicle: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (vehicleContext.modal.type === 'add') {
                await addVehicle(formData);
                uiContext.setSnackbar({ open: true, message: 'Vehicle added successfully', severity: 'success' });
            } else {
                await updateVehicle(vehicleContext.modal.vehicle.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Vehicle updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating vehicle', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (vehicleContext.modal.vehicle) {
            if (vehicleContext.modal.type === 'edit') {
                setFormData(vehicleContext.modal.vehicle);
            }
        }
    }, [vehicleContext.modal.vehicle]);


    return {
        formData,
        setFormData,
        updateVehicle,
        addVehicle,
        handleClose,
        handleSubmit,
        loading
    }
}
