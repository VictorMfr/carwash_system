import { useEffect, useState } from "react";
import { useOperatorContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: '',
    lastname: '',
    phone: '',
    address: '',
    avatar: ''
}

export default function useOperatorModalController() {

    const operatorContext = useOperatorContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateOperator = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/service/operator/${id}`, {
                ...data
            });

            operatorContext.setOperators(prev => prev.map(operator => operator.id === Number(id) ? response.data : operator));
            setFormData(initialFormData);
            operatorContext.setModal({ open: false, type: 'add', operator: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addOperator = async (data: any) => {
        try {
            const response = await api.post(`/service/operator`, {
                ...data
            });
            
            operatorContext.setOperators([...operatorContext.operators, response.data]);
            setFormData(initialFormData);
            operatorContext.setModal({ open: false, type: 'add', operator: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        operatorContext.setModal({ open: false, type: 'add', operator: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (operatorContext.modal.type === 'add') {
                await addOperator(formData);
                uiContext.setSnackbar({ open: true, message: 'Operator added successfully', severity: 'success' });
            } else {
                await updateOperator(operatorContext.modal.operator.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Operator updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating operator', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (operatorContext.modal.operator) {
            setFormData(operatorContext.modal.operator);
        }
    }, [operatorContext.modal.operator]);

    return {
        formData,
        setFormData,
        updateOperator,
        addOperator,
        handleClose,
        handleSubmit,
        loading
    }
}
