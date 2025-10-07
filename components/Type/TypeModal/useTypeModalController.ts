import { useEffect, useState } from "react";
import { useTypeContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: ''
}

export default function useTypeModalController() {

    const typeContext = useTypeContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);


    const updateType = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/finance/type/${id}`, {
                ...data
            });

            typeContext.setTypes(prev => prev.map(type => type.id === Number(id) ? response.data : type));
            setFormData(initialFormData);
            typeContext.setModal({ open: false, type: 'add', typeItem: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addType = async (data: any) => {
        try {
            const response = await api.post(`/api/finance/type`, {
                ...data
            });
            
            typeContext.setTypes([...typeContext.types, response.data]);
            setFormData(initialFormData);
            typeContext.setModal({ open: false, type: 'add', typeItem: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        typeContext.setModal({ open: false, type: 'add', typeItem: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (typeContext.modal.type === 'add') {
                await addType(formData);
                uiContext.setSnackbar({ open: true, message: 'Type added successfully', severity: 'success' });
            } else {
                await updateType(typeContext.modal.typeItem.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Type updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating type', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (typeContext.modal.typeItem) {
            if (typeContext.modal.type === 'edit') {
                setFormData(typeContext.modal.typeItem);
            }
        }
    }, [typeContext.modal.typeItem]);


    return {
        formData,
        setFormData,
        updateType,
        addType,
        handleClose,
        handleSubmit,
        loading
    }
}
