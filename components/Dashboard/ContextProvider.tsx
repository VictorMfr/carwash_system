import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface DashboardContextType {
    isClosing: boolean;
    setIsClosing: Dispatch<SetStateAction<boolean>>;
    mobileOpen: boolean;
    setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardContext = createContext<DashboardContextType>({
    isClosing: false,
    setIsClosing: () => { },
    mobileOpen: false,
    setMobileOpen: () => { },
});

export const useDashboardContext = () => {
    return useContext(DashboardContext);
}

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const value = {
        isClosing,
        setIsClosing,
        mobileOpen,
        setMobileOpen,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}