import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { AccountContextType } from "../ContextProvider";
import { Dispatch, SetStateAction } from "react";
import api from "@/lib/axios";


export default function useToolBarController(accountContext: AccountContextType) {
    const uiContext = useUIDisplayControls();

    const handleDeletion = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await api.delete(`/api/finance/account`, {
                data: {
                    ids: Array.from(accountContext.rowSelected.ids)
                }
            });

            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
            accountContext.setAccounts(prev => prev.filter(account => !accountContext.rowSelected.ids.has(account.id)));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const confirmDeletion = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete Many Accounts',
            message: 'Are you sure you want to delete these accounts?',
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

    const handleAddAccount = () => {
        accountContext.setModal({ open: true, type: 'add', account: null });
    }

    return {
        handleDeletion,
        confirmDeletion,
        handleAddAccount,
    }
}
