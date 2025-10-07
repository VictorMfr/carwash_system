import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { BrandContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";


export default function useToolBarController(brandContext: BrandContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/stock/brand`, {
                data: {
                    ids: Array.from(brandContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            brandContext.setBrands(prev => prev.filter(brand => !brandContext.rowSelected.ids.has(brand.id)));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Brands',
            message: 'Are you sure you want to delete these brands?',
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

    const handleAddBrand = () => {
        brandContext.setModal({ open: true, type: 'add', brand: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddBrand,
    }
}
