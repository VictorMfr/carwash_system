// Brand Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Brand } from "@/services/backend/models/associations";

export interface BrandContextType {
    brands: Brand[];
    setBrands: Dispatch<SetStateAction<Brand[]>>;
    loadingBrands: boolean;
    setLoadingBrands: (loadingBrands: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        brand: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', brand: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const BrandContext = createContext<BrandContextType>({
    brands: [],
    setBrands: () => { },
    loadingBrands: false,
    setLoadingBrands: () => { },
    modal: {
        open: false,
        type: 'add',
        brand: null,
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

export const useBrandContext = () => {
    return useContext(BrandContext);
}

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        brand: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        brands,
        setBrands,
        loadingBrands,
        setLoadingBrands,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <BrandContext.Provider value={data}>
                {children}
            </BrandContext.Provider>
        </>
    );
};