// Vehicle Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Vehicle } from "@/services/backend/models/associations";

export interface VehicleContextType {
    vehicles: Vehicle[];
    setVehicles: Dispatch<SetStateAction<Vehicle[]>>;
    loadingVehicles: boolean;
    setLoadingVehicles: (loadingVehicles: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        vehicle: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', vehicle: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const VehicleContext = createContext<VehicleContextType>({
    vehicles: [],
    setVehicles: () => { },
    loadingVehicles: false,
    setLoadingVehicles: () => { },
    modal: {
        open: false,
        type: 'add',
        vehicle: null,
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

export const useVehicleContext = () => {
    return useContext(VehicleContext);
}

export const VehicleProvider = ({ children }: { children: React.ReactNode }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        vehicle: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        vehicles,
        setVehicles,
        loadingVehicles,
        setLoadingVehicles,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <VehicleContext.Provider value={data}>
                {children}
            </VehicleContext.Provider>
        </>
    );
};