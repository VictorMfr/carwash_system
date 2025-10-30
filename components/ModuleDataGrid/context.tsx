import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { createContext, SetStateAction, Dispatch, useContext, useState } from "react";
import useFetch from "@/hooks/fetch/useFetch";

const initialModalState: Modal = { open: false, type: 'add', data: null };

export interface DataGridContextType {
    modal: Modal;
    setModal: (modal: Modal) => void;
    moduleSettings: ModuleFormGridData;
    fetchData: any[];
    fetchLoading: boolean;
    setFetchData: Dispatch<SetStateAction<any[]>>;
}


const datagridContext = createContext<DataGridContextType>({
    modal: initialModalState,
    setModal: () => {},
    moduleSettings: {} as ModuleFormGridData,
    fetchData: [],
    fetchLoading: false,
    setFetchData: () => {},
});

export function useModuleDataGridContext() {
    const context = useContext(datagridContext);

    if (!datagridContext) {
        throw new Error('useModuleDataGridContext must be used within a DataGridContext');
    }
    
    return context;
}

interface Modal {
    open: boolean;
    type: 'add' | 'edit';
    data: any;
}

export default function DataGridContext({ 
    children,
    moduleSettings
}: { 
    children: React.ReactNode,
    moduleSettings: ModuleFormGridData
}) {
    const [modal, setModal] = useState<Modal>(initialModalState);
    const fetch = useFetch(moduleSettings.url);

    const ctxData = {
        modal,
        moduleSettings,
        fetchData: fetch.data,
        fetchLoading: fetch.loading,
        setFetchData: fetch.setData,
        setModal
    };

    return (
        <datagridContext.Provider value={ctxData}>
            {children}
        </datagridContext.Provider>
    );
} 