// StockDetails Context Provider
import { Brand, Stock, State } from "@/services/backend/models/associations";
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import api from "@/lib/axios";

export interface StockDetailsContextType {
    details: any[];
    setDetails: Dispatch<SetStateAction<any[]>>;
    loadingDetails: boolean;
    setLoadingDetails: (loadingDetails: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'update';
        detail: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'update', detail: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
    stockId: string;
    stock: Stock | null;
    setStock: (stock: Stock | null) => void;
    selectedStock: Stock | null;
    setSelectedStock: (stock: Stock | null) => void;
    brands: Brand[];
    setBrands: (brands: Brand[]) => void;
    states: State[];
    setStates: (states: State[]) => void;
    refreshStockDetails: () => Promise<void>;
}

export const StockDetailsContext = createContext<StockDetailsContextType>({
    details: [],
    setDetails: () => { },
    loadingDetails: false,
    setLoadingDetails: () => { },
    modal: {
        open: false,
        type: 'add',
        detail: null,
    },
    setModal: () => { },
    rowSelected: {
        type: 'include',
        ids: new Set()
    },
    setRowSelected: () => { },
    loadingModal: false,
    setLoadingModal: () => { },
    stockId: '',
    stock: null,
    setStock: () => { },
    selectedStock: null,
    setSelectedStock: () => { },
    brands: [],
    setBrands: () => { },
    states: [],
    setStates: () => { },
    refreshStockDetails: async () => { },
});

export const useStockDetailsContext = () => {
    return useContext(StockDetailsContext);
}

export const StockDetailsProvider = ({ children, stockId }: { children: React.ReactNode, stockId: string }) => {
    const [details, setDetails] = useState<GridRowsProp[]>([]);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'update',
        detail: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);
    const [stock, setStock] = useState<Stock | null>(null);
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [states, setStates] = useState<State[]>([]);

    const refreshStockDetails = async () => {
        try {
            setLoadingDetails(true);
            const response = await api.get(`/api/stock/${stockId}/details`);
            setDetails(response.data);
        } catch (error) {
            console.error('Error refreshing stock details:', error);
        } finally {
            setLoadingDetails(false);
        }
    };

    const data = {
        details,
        setDetails,
        loadingDetails,
        setLoadingDetails,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal,
        stockId,
        stock,
        setStock,
        selectedStock,
        setSelectedStock,
        brands,
        setBrands,
        states,
        setStates,
        refreshStockDetails
    }

    return (
        <>
            <StockDetailsContext.Provider value={data}>
                {children}
            </StockDetailsContext.Provider>
        </>
    );
};

