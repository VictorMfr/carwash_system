import { useEffect, useState } from "react";
import { useClientContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: '',
    lastname: '',
    phone: ''
}

export default function useClientModalController() {

    const clientContext = useClientContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateClient = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/service/client/${id}`, {
                ...data
            });

            clientContext.setClients(prev => prev.map(client => client.id === Number(id) ? response.data : client));
            setFormData(initialFormData);
            clientContext.setModal({ open: false, type: 'add', client: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addClient = async (data: any) => {
        try {
            const response = await api.post(`/service/client`, {
                ...data
            });
            
            clientContext.setClients([...clientContext.clients, response.data]);
            setFormData(initialFormData);
            clientContext.setModal({ open: false, type: 'add', client: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        clientContext.setModal({ open: false, type: 'add', client: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (clientContext.modal.type === 'add') {
                await addClient(formData);
                uiContext.setSnackbar({ open: true, message: 'Client added successfully', severity: 'success' });
            } else {
                await updateClient(clientContext.modal.client.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Client updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating client', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (clientContext.modal.client) {
            setFormData(clientContext.modal.client);
        }
    }, [clientContext.modal.client]);

    return {
        formData,
        setFormData,
        updateClient,
        addClient,
        handleClose,
        handleSubmit,
        loading
    }
}
