import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { MarketingContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";


export default function useToolBarController(marketingsContext: MarketingContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/marketing`, {
                data: {
                    ids: Array.from(marketingsContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            marketingsContext.setMarketings(prev => prev.filter(marketing => !marketingsContext.rowSelected.ids.has(marketing.id)));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Marketing Items',
            message: 'Are you sure you want to delete these marketing items?',
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

    const handleAddMarketing = () => {
        marketingsContext.setModal({ open: true, type: 'add', marketing: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddMarketing,
    }
}
