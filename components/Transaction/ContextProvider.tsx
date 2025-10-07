// Transaction Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Transaction } from "@/services/backend/models/associations";

export interface TransactionContextType {
    transactions: Transaction[];
    setTransactions: Dispatch<SetStateAction<Transaction[]>>;
    loadingTransactions: boolean;
    setLoadingTransactions: (loadingTransactions: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        transaction: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', transaction: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const TransactionContext = createContext<TransactionContextType>({
    transactions: [],
    setTransactions: () => { },
    loadingTransactions: false,
    setLoadingTransactions: () => { },
    modal: {
        open: false,
        type: 'add',
        transaction: null,
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

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        transaction: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        transactions,
        setTransactions,
        loadingTransactions,
        setLoadingTransactions,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <TransactionContext.Provider value={data}>
                {children}
            </TransactionContext.Provider>
        </>
    );
};
