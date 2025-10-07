// Finance Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface FinanceContextType {
    finance: any[];
    setFinance: Dispatch<SetStateAction<any[]>>;
    loadingFinance: boolean;
    setLoadingFinance: (loadingFinance: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        finance: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', finance: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const FinanceContext = createContext<FinanceContextType>({
    finance: [],
    setFinance: () => { },
    loadingFinance: false,
    setLoadingFinance: () => { },
    modal: {
        open: false,
        type: 'add',
        finance: null,
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

export const useFinanceContext = () => {
    return useContext(FinanceContext);
}

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
    const [finance, setFinance] = useState<any[]>([]);
    const [loadingFinance, setLoadingFinance] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        finance: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        finance,
        setFinance,
        loadingFinance,
        setLoadingFinance,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <FinanceContext.Provider value={data}>
                {children}
            </FinanceContext.Provider>
        </>
    );
};
