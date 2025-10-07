// VehicleModel Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { VehicleModel } from "@/services/backend/models/associations";

export interface VehicleModelContextType {
    vehicleModels: VehicleModel[];
    setVehicleModels: Dispatch<SetStateAction<VehicleModel[]>>;
    loadingVehicleModels: boolean;
    setLoadingVehicleModels: (loadingVehicleModels: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        vehicleModel: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', vehicleModel: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const VehicleModelContext = createContext<VehicleModelContextType>({
    vehicleModels: [],
    setVehicleModels: () => { },
    loadingVehicleModels: false,
    setLoadingVehicleModels: () => { },
    modal: {
        open: false,
        type: 'add',
        vehicleModel: null,
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
    const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
    const [loadingVehicleModels, setLoadingVehicleModels] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        vehicleModel: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        vehicleModels,
        setVehicleModels,
        loadingVehicleModels,
        setLoadingVehicleModels,
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
