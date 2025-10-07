// Service Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface ServiceContextType {
    services: any[];
    setServices: Dispatch<SetStateAction<any[]>>;
    loadingServices: boolean;
    setLoadingServices: (loadingServices: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'update';
        service: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'update', service: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const ServiceContext = createContext<ServiceContextType>({
    services: [],
    setServices: () => { },
    loadingServices: false,
    setLoadingServices: () => { },
    modal: {
        open: false,
        type: 'add',
        service: null,
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

export const useServiceContext = () => {
    return useContext(ServiceContext);
}



export const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
    const [services, setServices] = useState<GridRowsProp[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'update',
        service: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);


    const data = {
        services,
        setServices,
        loadingServices,
        setLoadingServices,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <ServiceContext.Provider value={data}>
                {children}
            </ServiceContext.Provider>
        </>
    );
};
