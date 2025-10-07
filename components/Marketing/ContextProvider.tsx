// Marketing Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface MarketingContextType {
    marketings: any[];
    setMarketings: Dispatch<SetStateAction<any[]>>;
    loadingMarketings: boolean;
    setLoadingMarketings: (loadingMarketings: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        marketing: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', marketing: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const MarketingContext = createContext<MarketingContextType>({
    marketings: [],
    setMarketings: () => { },
    loadingMarketings: false,
    setLoadingMarketings: () => { },
    modal: {
        open: false,
        type: 'add',
        marketing: null,
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

export const useMarketingContext = () => {
    return useContext(MarketingContext);
}

export const MarketingProvider = ({ children }: { children: React.ReactNode }) => {
    const [marketings, setMarketings] = useState<GridRowsProp[]>([]);
    const [loadingMarketings, setLoadingMarketings] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        marketing: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        marketings,
        setMarketings,
        loadingMarketings,
        setLoadingMarketings,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <MarketingContext.Provider value={data}>
                {children}
            </MarketingContext.Provider>
        </>
    );
};
