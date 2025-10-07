import { useEffect, useState } from "react";
import { useFinanceContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

const initialFormData = {
    name: '',
    description: '',
    dolar_rate: 0,
    amount: 0,
    date: null
}

type FormData = {
    name: string;
    description: string;
    dolar_rate: number;
    amount: number;
    date: Dayjs | null;
};

export default function useFinanceModalController() {

    const financeContext = useFinanceContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateFinance = async (id: string, data: any) => {
        try {
            setLoading(true);

            const payload = {
                ...data,
                date: data?.date ? data.date.toISOString() : null,
            };

            const response = await api.put(`/api/finance/${id}`, payload);

            financeContext.setFinance(prev => prev.map(item => item.id === Number(id) ? response.data : item));
            setFormData(initialFormData);
            financeContext.setModal({ open: false, type: 'add', finance: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addFinance = async (data: any) => {
        try {
            const payload = {
                ...data,
                date: data?.date ? data.date.toISOString() : null,
            };

            const response = await api.post(`/api/finance`, payload);
            
            financeContext.setFinance([...financeContext.finance, response.data]);
            setFormData(initialFormData);
            financeContext.setModal({ open: false, type: 'add', finance: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        financeContext.setModal({ open: false, type: 'add', finance: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (financeContext.modal.type === 'add') {
                await addFinance(formData);
                uiContext.setSnackbar({ open: true, message: 'Finance item added successfully', severity: 'success' });
            } else {
                await updateFinance(financeContext.modal.finance.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Finance item updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating finance item', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (financeContext.modal.finance) {
            const f = financeContext.modal.finance as any;
            setFormData({
                name: f.name ?? '',
                description: f.description ?? '',
                dolar_rate: f.dolar_rate ?? 0,
                amount: f.amount ?? 0,
                date: f.date ? dayjs(f.date) : null,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [financeContext.modal.finance]);

    return {
        formData,
        setFormData,
        updateFinance,
        addFinance,
        handleClose,
        handleSubmit,
        loading
    }
}