// Product Context Provider
import { GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface ProductContextType {
    products: any[];
    setProducts: Dispatch<SetStateAction<any[]>>;
    loadingProducts: boolean;
    setLoadingProducts: (loadingProducts: boolean) => void;
    modal: {
        open: boolean;
        type: 'add' | 'edit';
        product: any;
    };
    setModal: (modal: { open: boolean, type: 'add' | 'edit', product: any }) => void;
    rowSelected: GridRowSelectionModel;
    setRowSelected: (rowSelected: GridRowSelectionModel) => void;
    loadingModal: boolean;
    setLoadingModal: (loadingModal: boolean) => void;
}

export const ProductContext = createContext<ProductContextType>({
    products: [],
    setProducts: () => { },
    loadingProducts: false,
    setLoadingProducts: () => { },
    modal: {
        open: false,
        type: 'add',
        product: null,
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

export const useProductContext = () => {
    return useContext(ProductContext);
}

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<GridRowsProp[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set()
    });
    const [modal, setModal] = useState({
        open: false,
        type: 'add' as 'add' | 'edit',
        product: null,
    });
    const [loadingModal, setLoadingModal] = useState(false);

    const data = {
        products,
        setProducts,
        loadingProducts,
        setLoadingProducts,
        modal,
        setModal,
        rowSelected,
        setRowSelected,
        loadingModal,
        setLoadingModal
    }

    return (
        <>
            <ProductContext.Provider value={data}>
                {children}
            </ProductContext.Provider>
        </>
    );
};