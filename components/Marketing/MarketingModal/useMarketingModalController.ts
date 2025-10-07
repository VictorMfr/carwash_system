import { useEffect, useState } from "react";
import { useMarketingContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: '',
    description: ''
}

export default function useMarketingModalController() {

    const marketingsContext = useMarketingContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateMarketing = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/marketing/${id}`, {
                ...data
            });

            marketingsContext.setMarketings(prev => prev.map(marketing => marketing.id === Number(id) ? response.data : marketing));
            setFormData(initialFormData);
            marketingsContext.setModal({ open: false, type: 'add', marketing: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addMarketing = async (data: any) => {
        try {
            const response = await api.post(`/marketing`, {
                ...data
            });
            
            marketingsContext.setMarketings([...marketingsContext.marketings, response.data]);
            setFormData(initialFormData);
            marketingsContext.setModal({ open: false, type: 'add', marketing: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        marketingsContext.setModal({ open: false, type: 'add', marketing: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (marketingsContext.modal.type === 'add') {
                await addMarketing(formData);
                uiContext.setSnackbar({ open: true, message: 'Marketing item added successfully', severity: 'success' });
            } else {
                await updateMarketing(marketingsContext.modal.marketing.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Marketing item updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating marketing item', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (marketingsContext.modal.marketing) {
            setFormData(marketingsContext.modal.marketing);
        }
    }, [marketingsContext.modal.marketing]);

    return {
        formData,
        setFormData,
        updateMarketing,
        addMarketing,
        handleClose,
        handleSubmit,
        loading
    }
}
