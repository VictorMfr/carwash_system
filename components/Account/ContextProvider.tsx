// Account Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Account } from "@/services/backend/models/associations";

export interface AccountContextType {
    accounts: Account[];
    setAccounts: Dispatch<SetStateAction<Account[]>>;
    loadingAccounts: boolean;
    setLoadingAccounts: (loadingAccounts: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        account: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', account: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const AccountContext = createContext<AccountContextType>({
    accounts: [],
    setAccounts: () => { },
    loadingAccounts: false,
    setLoadingAccounts: () => { },
    modal: {
        open: false,
        type: 'add',
        account: null,
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

export const useAccountContext = () => {
    return useContext(AccountContext);
}

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        account: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        accounts,
        setAccounts,
        loadingAccounts,
        setLoadingAccounts,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <AccountContext.Provider value={data}>
                {children}
            </AccountContext.Provider>
        </>
    );
};