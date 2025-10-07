import { useEffect, useState } from "react";
import { useNotificationContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    title: '',
    message: '',
    type: 'info'
}

export default function useNotificationModalController() {

    const notificationsContext = useNotificationContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateNotification = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/notification/${id}`, {
                ...data
            });

            notificationsContext.setNotifications(prev => prev.map(notification => notification.id === Number(id) ? response.data : notification));
            setFormData(initialFormData);
            notificationsContext.setModal({ open: false, type: 'add', notification: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addNotification = async (data: any) => {
        try {
            const response = await api.post(`/notification`, {
                ...data
            });
            
            notificationsContext.setNotifications([...notificationsContext.notifications, response.data]);
            setFormData(initialFormData);
            notificationsContext.setModal({ open: false, type: 'add', notification: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        notificationsContext.setModal({ open: false, type: 'add', notification: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (notificationsContext.modal.type === 'add') {
                await addNotification(formData);
                uiContext.setSnackbar({ open: true, message: 'Notification added successfully', severity: 'success' });
            } else {
                await updateNotification(notificationsContext.modal.notification.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Notification updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating notification', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (notificationsContext.modal.notification) {
            setFormData(notificationsContext.modal.notification);
        }
    }, [notificationsContext.modal.notification]);

    return {
        formData,
        setFormData,
        updateNotification,
        addNotification,
        handleClose,
        handleSubmit,
        loading
    }
}
