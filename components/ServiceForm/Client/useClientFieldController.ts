import { useEffect, useState } from "react";
import { ClientFieldType } from "./ClientField";
import { Client } from "@/services/backend/models/associations";
import { AutocompleteChangeDetails, AutocompleteChangeReason, createFilterOptions, FilterOptionsState } from "@mui/material";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

const filter = createFilterOptions<ClientFieldType>();

interface DialogValueType {
    id: number;
    name: string;
    lastname: string;
    phone: string;
}

export default function useClientFieldController() {

    const uiContext = useUIDisplayControls();
    const [clientOptions, setClientOptions] = useState<ClientFieldType[]>([]);
    const [value, setValue] = useState<ClientFieldType | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dialogValue, setDialogValue] = useState<DialogValueType>({
        id: 0,
        name: '',
        lastname: '',
        phone: ''
    });

    const handleSubmit = async () => {

        if (dialogValue.name === '' || dialogValue.lastname === '' || dialogValue.phone === '') {
            return uiContext.setSnackbar({ open: true, message: 'Please fill all the fields', severity: 'error' });
        }

        try {
            
            const response = await api.post(`/api/service/client`, {
                ...dialogValue
            });

            setValue(response.data);
            setClientOptions([...clientOptions, response.data]);
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
        value: ClientFieldType | null | string,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<ClientFieldType> | undefined
    ) => {
        if (typeof value === 'string') {
            setOpen(true);
            setDialogValue({
                id: 0,
                name: value,
                lastname: '',
                phone: ''
            });
        } else if (value && value.inputValue) {
            setOpen(true);
            setDialogValue({
                id: 0,
                name: value.inputValue || '',
                lastname: '',
                phone: ''
            });
        } else {
            setValue(value);
        }
    }

    const filterOptionsHandler = (
        options: ClientFieldType[],
        params: FilterOptionsState<ClientFieldType>
    ) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
                id: 0,
                lastname: '',
                phone: ''
            });
        }

        return filtered;
    }

    const getOptionLabelHandler = (option: ClientFieldType | string) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return `${option.name} ${option.lastname}`;
    }

    const getClientOptions = async () => {
        try {
            const response = await api.get('/api/service/client');
            setClientOptions(response.data);
        } catch (error) {
            setClientOptions([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getClientOptions();
    }, []);

    return {
        value,
        open,
        dialogValue,
        loading,
        clientOptions,
        setDialogValue,
        handleClose,
        changeValueHandler,
        filterOptionsHandler,
        getOptionLabelHandler,
        handleSubmit,
    }
}
