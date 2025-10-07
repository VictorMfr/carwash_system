import { useEffect, useState } from "react";
import { useAccountContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: '',
    description: ''
}

export default function useAccountModalController() {

    const accountContext = useAccountContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateAccount = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/finance/account/${id}`, {
                ...data
            });

            accountContext.setAccounts(prev => prev.map(account => account.id === Number(id) ? response.data : account));
            setFormData(initialFormData);
            accountContext.setModal({ open: false, type: 'add', account: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addAccount = async (data: any) => {
        try {
            const response = await api.post(`/api/finance/account`, {
                ...data
            });
            
            accountContext.setAccounts([...accountContext.accounts, response.data]);
            setFormData(initialFormData);
            accountContext.setModal({ open: false, type: 'add', account: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        accountContext.setModal({ open: false, type: 'add', account: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (accountContext.modal.type === 'add') {
                await addAccount(formData);
                uiContext.setSnackbar({ open: true, message: 'Account added successfully', severity: 'success' });
            } else {
                await updateAccount(accountContext.modal.account.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Account updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating account', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (accountContext.modal.account) {
            setFormData(accountContext.modal.account);
        }
    }, [accountContext.modal.account]);

    return {
        formData,
        setFormData,
        updateAccount,
        addAccount,
        handleClose,
        handleSubmit,
        loading
    }
}
