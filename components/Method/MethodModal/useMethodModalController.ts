import { useEffect, useState } from "react";
import { useMethodContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: ''
}

export default function useMethodModalController() {

    const methodContext = useMethodContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateMethod = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/finance/method/${id}`, {
                ...data
            });

            methodContext.setMethods(prev => prev.map(method => method.id === Number(id) ? response.data : method));
            setFormData(initialFormData);
            methodContext.setModal({ open: false, type: 'add', method: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addMethod = async (data: any) => {
        try {
            const response = await api.post(`/api/finance/method`, {
                ...data
            });
            
            methodContext.setMethods([...methodContext.methods, response.data]);
            setFormData(initialFormData);
            methodContext.setModal({ open: false, type: 'add', method: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        methodContext.setModal({ open: false, type: 'add', method: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (methodContext.modal.type === 'add') {
                await addMethod(formData);
                uiContext.setSnackbar({ open: true, message: 'Method added successfully', severity: 'success' });
            } else {
                await updateMethod(methodContext.modal.method.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Method updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating method', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (methodContext.modal.method) {
            setFormData(methodContext.modal.method);
        }
    }, [methodContext.modal.method]);

    return {
        formData,
        setFormData,
        updateMethod,
        addMethod,
        handleClose,
        handleSubmit,
        loading
    }
}
