import { AlertColor } from "@mui/material";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface AlertAction {
    label: string;
    onClick: (setLoading: Dispatch<SetStateAction<boolean>>) => void;
}

const UIDisplayControlsContext = createContext<{
    snackbar: {
        open: boolean;
        message: string;
        severity: AlertColor;
    };
    setSnackbar: Dispatch<SetStateAction<{ open: boolean; message: string; severity: AlertColor; }>>;
    alert: {
        open: boolean;
        title: string;
        message: string;
        severity: AlertColor;
        actions: AlertAction[];
    };
    setAlert: Dispatch<SetStateAction<{ 
        open: boolean; 
        title: string; 
        message: string; 
        severity: AlertColor; 
        actions: AlertAction[]; 
    }>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    screenLoading: boolean;
    setScreenLoading: Dispatch<SetStateAction<boolean>>;
}>({
    snackbar: {
        open: false,
        message: '',
        severity: 'success'
    },
    setSnackbar: () => {},
    alert: {
        open: false,
        title: '',
        message: '',
        severity: 'success' as AlertColor,
        actions: [] as AlertAction[]
    },
    setAlert: () => {},
    loading: false,
    setLoading: () => {},
    screenLoading: false,
    setScreenLoading: () => {}
});

export const useUIDisplayControls = () => {
    return useContext(UIDisplayControlsContext);
}

export default function UIDisplayControlsProvider({ children }: { children: React.ReactNode }) {
    
    const [snackbar, setSnackbar] = useState<typeof UIDisplayControlsContext.prototype.snackbar>({
        open: false,
        message: '',
        severity: 'success' as AlertColor
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<typeof UIDisplayControlsContext.prototype.alert>({
        open: false,
        title: '',
        message: '',
        severity: 'success' as AlertColor,
        actions: [] as AlertAction[]
    });

    const [screenLoading, setScreenLoading] = useState(false);
    
    const data = {
        snackbar,
        setSnackbar,
        alert,
        setAlert,
        loading,
        setLoading,
        screenLoading,
        setScreenLoading
    }

    return (
        <UIDisplayControlsContext.Provider value={data}>
            {children}
        </UIDisplayControlsContext.Provider>
    );
}

