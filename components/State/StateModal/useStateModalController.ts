import { useEffect, useState } from "react";
import { useStateContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: ''
}

export default function useStateModalController() {

    const stateContext = useStateContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);


    const updateState = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/stock/state/${id}`, {
                ...data
            });

            stateContext.setStates(prev => prev.map((state: any) => state.id === Number(id) ? response.data : state));
            setFormData(initialFormData);
            stateContext.setModal({ open: false, type: 'add', state: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addState = async (data: any) => {
        try {
            const response = await api.post(`/api/stock/state`, {
                ...data
            });
            
            stateContext.setStates([...stateContext.states, response.data]);
            setFormData(initialFormData);
            stateContext.setModal({ open: false, type: 'add', state: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        stateContext.setModal({ open: false, type: 'add', state: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (stateContext.modal.type === 'add') {
                await addState(formData);
                uiContext.setSnackbar({ open: true, message: 'State added successfully', severity: 'success' });
            } else {
                await updateState(stateContext.modal.state.id, formData);
                uiContext.setSnackbar({ open: true, message: 'State updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating state', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (stateContext.modal.state) {
            if (stateContext.modal.type === 'edit') {
                setFormData(stateContext.modal.state);
            }
        }
    }, [stateContext.modal.state]);


    return {
        formData,
        setFormData,
        updateState,
        addState,
        handleClose,
        handleSubmit,
        loading
    }
}
