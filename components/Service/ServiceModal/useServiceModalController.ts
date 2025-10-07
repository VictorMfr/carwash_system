import { useEffect, useState } from "react";
import { useServiceContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    date: '',
    recipeId: null as number | null,
    operatorIds: [] as number[],
    vehicleId: null as number | null,
    stockDetailIds: [] as number[]
}

export default function useServiceModalController() {

    const servicesContext = useServiceContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);


    const updateService = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/service/${id}`, {
                ...data
            });

            servicesContext.setServices(prev => prev.map(service => service.id === Number(id) ? response.data : service));
            setFormData(initialFormData);
            servicesContext.setModal({ open: false, type: 'add', service: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addService = async (data: any) => {
        try {
            const response = await api.post(`/service`, {
                ...data
            });
            
            servicesContext.setServices([...servicesContext.services, response.data]);
            setFormData(initialFormData);
            servicesContext.setModal({ open: false, type: 'add', service: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        servicesContext.setModal({ open: false, type: 'add', service: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (servicesContext.modal.type === 'add') {
                await addService(formData);
                uiContext.setSnackbar({ open: true, message: 'Service added successfully', severity: 'success' });
            } else {
                await updateService(servicesContext.modal.service.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Service updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating service', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const handleDateChange = (value: string) => {
        setFormData({ ...formData, date: value });
    };

    const handleRecipeChange = (value: number | null) => {
        setFormData({ ...formData, recipeId: value });
    };

    const handleOperatorChange = (value: number[]) => {
        setFormData({ ...formData, operatorIds: value });
    };

    const handleVehicleChange = (value: number | null) => {
        setFormData({ ...formData, vehicleId: value });
    };

    const handleStockDetailChange = (value: number[]) => {
        setFormData({ ...formData, stockDetailIds: value });
    };

    useEffect(() => {
        if (servicesContext.modal.service) {
            if (servicesContext.modal.type === 'update') {
                const service = servicesContext.modal.service;
                setFormData({
                    date: service.date ? new Date(service.date).toISOString().split('T')[0] : '',
                    recipeId: service.Recipe?.id || null,
                    operatorIds: service.Operators?.map((op: any) => op.id) || [],
                    vehicleId: service.Vehicle?.id || null,
                    stockDetailIds: service.StockDetails?.map((sd: any) => sd.id) || []
                });
            }
        }
    }, [servicesContext.modal.service]);


    return {
        formData,
        setFormData,
        updateService,
        addService,
        handleClose,
        handleSubmit,
        loading,
        handleDateChange,
        handleRecipeChange,
        handleOperatorChange,
        handleVehicleChange,
        handleStockDetailChange
    }
}
