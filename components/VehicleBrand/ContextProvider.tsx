// VehicleBrand Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { VehicleBrand } from "@/services/backend/models/associations";

export interface VehicleBrandContextType {
    vehicleBrands: VehicleBrand[];
    setVehicleBrands: Dispatch<SetStateAction<VehicleBrand[]>>;
    loadingVehicleBrands: boolean;
    setLoadingVehicleBrands: (loadingVehicleBrands: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        vehicleBrand: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', vehicleBrand: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const VehicleBrandContext = createContext<VehicleBrandContextType>({
    vehicleBrands: [],
    setVehicleBrands: () => { },
    loadingVehicleBrands: false,
    setLoadingVehicleBrands: () => { },
    modal: {
        open: false,
        type: 'add',
        vehicleBrand: null,
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

export const useVehicleBrandContext = () => {
    return useContext(VehicleBrandContext);
}

export const VehicleBrandProvider = ({ children }: { children: React.ReactNode }) => {
    const [vehicleBrands, setVehicleBrands] = useState<VehicleBrand[]>([]);
    const [loadingVehicleBrands, setLoadingVehicleBrands] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        vehicleBrand: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        vehicleBrands,
        setVehicleBrands,
        loadingVehicleBrands,
        setLoadingVehicleBrands,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <VehicleBrandContext.Provider value={data}>
                {children}
            </VehicleBrandContext.Provider>
        </>
    );
};