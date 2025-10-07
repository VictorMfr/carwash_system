// Role Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface RoleContextType {
    roles: any[];
    setRoles: Dispatch<SetStateAction<any[]>>;
    loadingRoles: boolean;
    setLoadingRoles: (loadingRoles: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        role: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', role: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const RoleContext = createContext<RoleContextType>({
    roles: [],
    setRoles: () => { },
    loadingRoles: false,
    setLoadingRoles: () => { },
    modal: {
        open: false,
        type: 'add',
        role: null,
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

export const useRoleContext = () => {
    return useContext(RoleContext);
}

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [roles, setRoles] = useState<GridRowsProp[]>([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        role: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        roles,
        setRoles,
        loadingRoles,
        setLoadingRoles,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <RoleContext.Provider value={data}>
                {children}
            </RoleContext.Provider>
        </>
    );
};