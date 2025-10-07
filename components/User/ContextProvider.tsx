// User Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface UserContextType {
    users: any[];
    setUsers: Dispatch<SetStateAction<any[]>>;
    loadingUsers: boolean;
    setLoadingUsers: (loadingUsers: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit' | 'assignRole';
        user: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit' | 'assignRole', user: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
    users: [],
    setUsers: () => { },
    loadingUsers: false,
    setLoadingUsers: () => { },
    modal: {
        open: false,
        type: 'add',
        user: null,
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

export const useUserContext = () => {
    return useContext(UserContext);
}



export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState<GridRowsProp[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit' | 'assignRole',
        user: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);


    const data = {
        users,
        setUsers,
        loadingUsers,
        setLoadingUsers,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <UserContext.Provider value={data}>
                {children}
            </UserContext.Provider>
        </>
    );
};