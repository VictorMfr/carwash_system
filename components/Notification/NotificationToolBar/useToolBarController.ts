import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { NotificationContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";


export default function useToolBarController(notificationsContext: NotificationContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/notification`, {
                data: {
                    ids: Array.from(notificationsContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            notificationsContext.setNotifications(prev => prev.filter(notification => !notificationsContext.rowSelected.ids.has(notification.id)));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Notifications',
            message: 'Are you sure you want to delete these notifications?',
            severity: 'warning',
            actions: [
                {
                    label: 'Cancel',
                    onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
                },
                {
                    label: 'Delete',
                    onClick: (setLoading) => handleDeletion(setLoading)
                }
            ]
        })
    }

    const handleAddNotification = () => {
        notificationsContext.setModal({ open: true, type: 'add', notification: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddNotification,
    }
}
