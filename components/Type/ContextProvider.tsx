// Type Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Type } from "@/services/backend/models/associations";

export interface TypeContextType {
    types: Type[];
    setTypes: Dispatch<SetStateAction<Type[]>>;
    loadingTypes: boolean;
    setLoadingTypes: (loadingTypes: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        typeItem: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', typeItem: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const TypeContext = createContext<TypeContextType>({
    types: [],
    setTypes: () => { },
    loadingTypes: false,
    setLoadingTypes: () => { },
    modal: {
        open: false,
        type: 'add',
        typeItem: null,
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

export const useTypeContext = () => {
    return useContext(TypeContext);
}

export const TypeProvider = ({ children }: { children: React.ReactNode }) => {
    const [types, setTypes] = useState<Type[]>([]);
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        typeItem: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        types,
        setTypes,
        loadingTypes,
        setLoadingTypes,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <TypeContext.Provider value={data}>
                {children}
            </TypeContext.Provider>
        </>
    );
};