// Stock Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Stock } from "@/services/backend/models/associations";

export interface StockContextType {
    stocks: Stock[];
    setStocks: Dispatch<SetStateAction<Stock[]>>;
    loadingStocks: boolean;
    setLoadingStocks: (loadingStocks: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        stock: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', stock: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const StockContext = createContext<StockContextType>({
    stocks: [],
    setStocks: () => { },
    loadingStocks: false,
    setLoadingStocks: () => { },
    modal: {
        open: false,
        type: 'add',
        stock: null,
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

export const useStockContext = () => {
    return useContext(StockContext);
}

export const StockProvider = ({ children }: { children: React.ReactNode }) => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loadingStocks, setLoadingStocks] = useState(false);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        stock: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        stocks,
        setStocks,
        loadingStocks,
        setLoadingStocks,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <StockContext.Provider value={data}>
                {children}
            </StockContext.Provider>
        </>
    );
};