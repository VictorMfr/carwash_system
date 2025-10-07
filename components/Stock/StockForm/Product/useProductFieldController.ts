import { useEffect, useState } from "react";
import { ProductFieldType } from "./ProductField";
import { ProductType } from "@/services/backend/models/stock/product";
import { AutocompleteChangeDetails, AutocompleteChangeReason, createFilterOptions, FilterOptionsState } from "@mui/material";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

const filter = createFilterOptions<ProductFieldType>();

interface DialogValueType {
    id: number;
    name: string;
    unit: string;
    isTool: number;
}

export default function useProductFieldController() {

    const uiContext = useUIDisplayControls();
    const [productOptions, setProductOptions] = useState<ProductFieldType[]>([]);
    const [value, setValue] = useState<ProductFieldType | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dialogValue, setDialogValue] = useState<DialogValueType>({
        id: 0,
        name: '',
        unit: '',
        isTool: 0
    });

    const handleSubmit = async () => {

        if (dialogValue.name === '' || dialogValue.unit === '') {
            return uiContext.setSnackbar({ open: true, message: 'Please fill all the fields', severity: 'error' });
        }

        try {
            
            const response = await api.post(`/api/stock/product`, {
                ...dialogValue
            });

            setValue(response.data);
            setProductOptions([...productOptions, response.data]);
            handleClose();

        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        setLoading(false);
        setOpen(false);
    }

    const changeValueHandler = (
        event: React.SyntheticEvent,
        value: ProductFieldType | null | string,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<ProductFieldType> | undefined
    ) => {
        if (typeof value === 'string') {
            setOpen(true);
            setDialogValue({
                id: 0,
                name: value,
                unit: '',
                isTool: 0
            });
        } else if (value && value.inputValue) {
            setOpen(true);
            setDialogValue({
                id: 0,
                name: value.inputValue || '',
                unit: '',
                isTool: 0
            });
        } else {
            setValue(value);
        }
    }

    const filterOptionsHandler = (
        options: ProductFieldType[],
        params: FilterOptionsState<ProductFieldType>
    ) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
                id: 0,
                unit: '',
                isTool: 0
            });
        }

        return filtered;
    }

    const getOptionLabelHandler = (option: ProductFieldType | string) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return option.name;
    }

    const getProductOptions = async () => {
        try {
            const response = await api.get('/api/stock/product');
            setProductOptions(response.data);
        } catch (error) {
            setProductOptions([]);
        } finally {
            setLoading(false);
        }
    }

    const handleIsToolChange = (isTool: number) => {
        setDialogValue(prevDialogValue => {
            const newDialogValue = { ...prevDialogValue, isTool };
            
            // Si isTool es true (1), establecer unit como 'u'
            if (isTool === 1) {
                newDialogValue.unit = 'u';
            }
            
            return newDialogValue;
        });
    }

    useEffect(() => {
        getProductOptions();
    }, []);

    return {
        value,
        open,
        dialogValue,
        loading,
        productOptions,
        setDialogValue,
        handleClose,
        changeValueHandler,
        filterOptionsHandler,
        getOptionLabelHandler,
        handleSubmit,
        handleIsToolChange, // Agregar esta función
    }
}