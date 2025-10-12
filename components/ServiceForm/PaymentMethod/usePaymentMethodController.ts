import { useEffect, useState } from "react";
import { AutocompleteChangeDetails, AutocompleteChangeReason, createFilterOptions, FilterOptionsState } from "@mui/material";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export interface PaymentMethodType {
    id: number;
    name: string;
    inputValue?: string;
}

const filter = createFilterOptions<PaymentMethodType>();

interface UsePaymentMethodControllerProps {
    onChange?: (method: PaymentMethodType | null) => void;
}

export default function usePaymentMethodController({ onChange }: UsePaymentMethodControllerProps = {}) {
    const uiContext = useUIDisplayControls();
    const [methodOptions, setMethodOptions] = useState<PaymentMethodType[]>([]);
    const [value, setValue] = useState<PaymentMethodType | null>(null);
    const [loading, setLoading] = useState(true);

    const addMethod = async (name: string) => {
        try {
            const res = await api.post('/api/finance/method', { name: name.trim() });
            const method = res.data as PaymentMethodType;
            setMethodOptions(prev => [...prev, method]);
            setValue(method);
            onChange?.(method);
        } catch (e) {
            // ignore
        } finally {
            uiContext.setAlert(prev => ({ ...prev, open: false }));
        }
    }

    const changeValueHandler = (
        event: React.SyntheticEvent,
        newValue: PaymentMethodType | null | string,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<PaymentMethodType> | undefined
    ) => {
        if (typeof newValue === 'string') {
            const pending = newValue.trim();
            if (!pending) return;
            uiContext.setAlert({
                open: true,
                title: 'Agregar método de pago',
                message: `¿Deseas agregar "${pending}" como nuevo método?`,
                severity: 'warning',
                actions: [
                    { label: 'Cancelar', onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) },
                    { label: 'Agregar', onClick: () => addMethod(pending) },
                ]
            });
        } else if (newValue && (newValue as PaymentMethodType).inputValue) {
            const pending = (newValue as PaymentMethodType).inputValue as string;
            uiContext.setAlert({
                open: true,
                title: 'Agregar método de pago',
                message: `¿Deseas agregar "${pending}" como nuevo método?`,
                severity: 'warning',
                actions: [
                    { label: 'Cancelar', onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) },
                    { label: 'Agregar', onClick: () => addMethod(pending) },
                ]
            });
        } else {
            setValue(newValue as PaymentMethodType | null);
            onChange?.(newValue as PaymentMethodType | null);
        }
    }

    const filterOptionsHandler = (
        options: PaymentMethodType[],
        params: FilterOptionsState<PaymentMethodType>
    ) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
            filtered.push({ id: 0, name: params.inputValue, inputValue: params.inputValue });
        }
        return filtered;
    }

    const getOptionLabelHandler = (option: PaymentMethodType | string) => {
        if (typeof option === 'string') return option;
        if ((option as any).inputValue) return (option as any).inputValue as string;
        return option.name ?? '';
    }

    const getMethodOptions = async () => {
        try {
            const response = await api.get('/api/finance/method');
            setMethodOptions(response.data);
        } catch (error) {
            setMethodOptions([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMethodOptions();
    }, []);

    return {
        value,
        loading,
        methodOptions,
        addMethod,
        changeValueHandler,
        filterOptionsHandler,
        getOptionLabelHandler,
    }
}


