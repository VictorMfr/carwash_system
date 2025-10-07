import { useEffect, useState } from "react";
import { useTransactionContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    type: '',
    amount: 0,
    description: '',
    date: ''
}

export default function useTransactionModalController() {

    const transactionContext = useTransactionContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);


    const updateTransaction = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/transaction/${id}`, {
                ...data
            });

            transactionContext.setTransactions(prev => prev.map(transaction => transaction.id === Number(id) ? response.data : transaction));
            setFormData(initialFormData);
            transactionContext.setModal({ open: false, type: 'add', transaction: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addTransaction = async (data: any) => {
        try {
            const response = await api.post(`/transaction`, {
                ...data
            });
            
            transactionContext.setTransactions([...transactionContext.transactions, response.data]);
            setFormData(initialFormData);
            transactionContext.setModal({ open: false, type: 'add', transaction: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        transactionContext.setModal({ open: false, type: 'add', transaction: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (transactionContext.modal.type === 'add') {
                await addTransaction(formData);
                uiContext.setSnackbar({ open: true, message: 'Transaction added successfully', severity: 'success' });
            } else {
                await updateTransaction(transactionContext.modal.transaction.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Transaction updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating transaction', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (transactionContext.modal.transaction) {
            if (transactionContext.modal.type === 'edit') {
                setFormData(transactionContext.modal.transaction);
            }
        }
    }, [transactionContext.modal.transaction]);


    return {
        formData,
        setFormData,
        updateTransaction,
        addTransaction,
        handleClose,
        handleSubmit,
        loading
    }
}
