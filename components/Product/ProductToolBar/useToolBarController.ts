import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { ProductContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useToolBarController(productContext: ProductContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/stock/product`, {
                data: {
                    ids: Array.from(productContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            productContext.setProducts(prev => prev.filter(product => !productContext.rowSelected.ids.has(product.id)));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Products',
            message: 'Are you sure you want to delete these products?',
            severity: 'warning',
            actions: [
                {
                    label: 'Cancel',
                    onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
                },
                {
                    label: 'Delete',
                    onClick: (setLoading) => handleDeletion(setLoading)
                }
            ]
        })
    }

    const handleAddProduct = () => {
        productContext.setModal({ open: true, type: 'add', product: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddProduct,
    }
}
