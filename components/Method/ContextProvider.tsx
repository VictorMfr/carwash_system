// Method Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface MethodContextType {
    methods: any[];
    setMethods: Dispatch<SetStateAction<any[]>>;
    loadingMethods: boolean;
    setLoadingMethods: (loadingMethods: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        method: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', method: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const MethodContext = createContext<MethodContextType>({
    methods: [],
    setMethods: () => { },
    loadingMethods: true,
    setLoadingMethods: () => { },
    modal: {
        open: false,
        type: 'add',
        method: null,
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

export const useMethodContext = () => {
    return useContext(MethodContext);
}

export const MethodProvider = ({ children }: { children: React.ReactNode }) => {
    const [methods, setMethods] = useState<GridRowsProp[]>([]);
    const [loadingMethods, setLoadingMethods] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        method: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        methods,
        setMethods,
        loadingMethods,
        setLoadingMethods,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <MethodContext.Provider value={data}>
                {children}
            </MethodContext.Provider>
        </>
    );
};