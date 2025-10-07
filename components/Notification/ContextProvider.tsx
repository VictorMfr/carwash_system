// Notification Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface NotificationContextType {
    notifications: any[];
    setNotifications: Dispatch<SetStateAction<any[]>>;
    loadingNotifications: boolean;
    setLoadingNotifications: (loadingNotifications: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        notification: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', notification: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    setNotifications: () => { },
    loadingNotifications: false,
    setLoadingNotifications: () => { },
    modal: {
        open: false,
        type: 'add',
        notification: null,
    },
    setModal: () => { },
    rowSelected: {
        type: 'include',
        ids: new Set()
    },
    setRowSelected: () => { },
    loadingModal: false,
    setLoadingModal: () => { },
});

export const useNotificationContext = () => {
    return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<GridRowsProp[]>([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        notification: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        notifications,
        setNotifications,
        loadingNotifications,
        setLoadingNotifications,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <NotificationContext.Provider value={data}>
                {children}
            </NotificationContext.Provider>
        </>
    );
};
