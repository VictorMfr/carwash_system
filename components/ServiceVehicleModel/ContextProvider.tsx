// VehicleModel Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface VehicleModelContextType {
    models: any[];
    setModels: Dispatch<SetStateAction<any[]>>;
    loadingModels: boolean;
    setLoadingModels: (loadingModels: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'update';
        model: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'update', model: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const VehicleModelContext = createContext<VehicleModelContextType>({
    models: [],
    setModels: () => { },
    loadingModels: false,
    setLoadingModels: () => { },
    modal: {
        open: false,
        type: 'add',
        model: null,
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

export const useVehicleModelContext = () => {
    return useContext(VehicleModelContext);
}



export const VehicleModelProvider = ({ children }: { children: React.ReactNode }) => {
    const [models, setModels] = useState<GridRowsProp[]>([]);
    const [loadingModels, setLoadingModels] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'update',
        model: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);


    const data = {
        models,
        setModels,
        loadingModels,
        setLoadingModels,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <VehicleModelContext.Provider value={data}>
                {children}
            </VehicleModelContext.Provider>
        </>
    );
};

