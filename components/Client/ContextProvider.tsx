// Client Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Client } from "@/services/backend/models/associations";

export interface ClientContextType {
    clients: Client[];
    setClients: Dispatch<SetStateAction<Client[]>>;
    loadingClients: boolean;
    setLoadingClients: (loadingClients: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        client: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', client: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const ClientContext = createContext<ClientContextType>({
    clients: [],
    setClients: () => { },
    loadingClients: false,
    setLoadingClients: () => { },
    modal: {
        open: false,
        type: 'add',
        client: null,
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

export const useClientContext = () => {
    return useContext(ClientContext);
}

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loadingClients, setLoadingClients] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        client: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        clients,
        setClients,
        loadingClients,
        setLoadingClients,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <ClientContext.Provider value={data}>
                {children}
            </ClientContext.Provider>
        </>
    );
};