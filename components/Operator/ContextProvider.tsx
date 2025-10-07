// Operator Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface OperatorContextType {
    operators: any[];
    setOperators: Dispatch<SetStateAction<any[]>>;
    loadingOperators: boolean;
    setLoadingOperators: (loadingOperators: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        operator: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', operator: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const OperatorContext = createContext<OperatorContextType>({
    operators: [],
    setOperators: () => { },
    loadingOperators: false,
    setLoadingOperators: () => { },
    modal: {
        open: false,
        type: 'add',
        operator: null,
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

export const useOperatorContext = () => {
    return useContext(OperatorContext);
}

export const OperatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [operators, setOperators] = useState<GridRowsProp[]>([]);
    const [loadingOperators, setLoadingOperators] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        operator: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        operators,
        setOperators,
        loadingOperators,
        setLoadingOperators,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <OperatorContext.Provider value={data}>
                {children}
            </OperatorContext.Provider>
        </>
    );
};