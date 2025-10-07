import { useEffect, useState } from "react";
import { useBrandContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: ''
}

export default function useBrandModalController() {

    const brandContext = useBrandContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateBrand = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/stock/brand/${id}`, {
                ...data
            });

            brandContext.setBrands(prev => prev.map((brand: any) => brand.id === Number(id) ? response.data : brand));
            setFormData(initialFormData);
            brandContext.setModal({ open: false, type: 'add', brand: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addBrand = async (data: any) => {
        try {
            const response = await api.post(`/api/stock/brand`, {
                ...data
            });
            
            brandContext.setBrands([...brandContext.brands, response.data]);
            setFormData(initialFormData);
            brandContext.setModal({ open: false, type: 'add', brand: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        brandContext.setModal({ open: false, type: 'add', brand: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (brandContext.modal.type === 'add') {
                await addBrand(formData);
                uiContext.setSnackbar({ open: true, message: 'Brand added successfully', severity: 'success' });
            } else {
                await updateBrand(brandContext.modal.brand.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Brand updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating brand', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (brandContext.modal.brand) {
            setFormData(brandContext.modal.brand);
        }
    }, [brandContext.modal.brand]);

    return {
        formData,
        setFormData,
        updateBrand,
        addBrand,
        handleClose,
        handleSubmit,
        loading
    }
}
