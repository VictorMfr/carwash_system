// State Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { State } from "@/services/backend/models/associations";

export interface StateContextType {
    states: State[];
    setStates: Dispatch<SetStateAction<State[]>>;
    loadingStates: boolean;
    setLoadingStates: (loadingStates: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        state: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', state: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const StateContext = createContext<StateContextType>({
    states: [],
    setStates: () => { },
    loadingStates: false,
    setLoadingStates: () => { },
    modal: {
        open: false,
        type: 'add',
        state: null,
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

export const useStateContext = () => {
    return useContext(StateContext);
}

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [states, setStates] = useState<State[]>([]);
    const [loadingStates, setLoadingStates] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        state: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        states,
        setStates,
        loadingStates,
        setLoadingStates,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <StateContext.Provider value={data}>
                {children}
            </StateContext.Provider>
        </>
    );
};