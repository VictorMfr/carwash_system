import { useEffect, useState } from "react";
import { AutocompleteChangeDetails, AutocompleteChangeReason, createFilterOptions, FilterOptionsState } from "@mui/material";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

interface StateType {
    id: number;
    name: string;
}

export interface StateFieldType extends StateType {
    inputValue?: string;
}

const filter = createFilterOptions<StateFieldType>();

interface UseStateFieldControllerProps {
    onChange?: (state: any) => void;
}

export default function useStateFieldController({ onChange }: UseStateFieldControllerProps = {}) {

    const uiContext = useUIDisplayControls();
    const [stateOptions, setStateOptions] = useState<StateFieldType[]>([]);
    const [value, setValue] = useState<StateFieldType | null>(null);
    const [loading, setLoading] = useState(true);
    const [pendingName, setPendingName] = useState<string | null>(null);

    const handleClose = () => {
        setLoading(false);
    }

    const addState = async (name?: string, setAlertLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {
        const stateName = name || pendingName;
        if (!stateName || stateName.trim() === '') return;
        try {
            setAlertLoading?.(true);
            setLoading(true);
            const response = await api.post('/api/stock/state', { name: stateName.trim() });
            const created: StateFieldType = response.data;

            // Update options immediately
            setStateOptions(prev => {
                const exists = prev.some(opt => opt.id === created.id);
                return exists ? prev : [created, ...prev];
            });

            // Select the newly created option
            setValue(created);
            onChange?.(created);

            // Close alert and notify
            uiContext.setAlert(prev => ({ ...prev, open: false }));
            uiContext.setSnackbar({ open: true, message: 'State created', severity: 'success' });
        } catch (error) {
            console.error('Error adding state:', error);
            uiContext.setSnackbar({ open: true, message: 'Failed to create state', severity: 'error' });
        } finally {
            setAlertLoading?.(false);
            setLoading(false);
            setPendingName(null);
        }
    }

    const changeValueHandler = (
        event: React.SyntheticEvent,
        newValue: StateFieldType | null | string,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<StateFieldType> | undefined
    ) => {
        if (typeof newValue === 'string') {
            setPendingName(newValue);
            uiContext.setAlert({
                open: true,
                title: 'Add New State',
                message: 'Are you sure you want to add this state?',
                severity: 'warning',
                actions: [
                    { 
                        label: 'Cancel', 
                        onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) 
                    },
                    {
                        label: 'Add',
                        onClick: (setLoading) => addState(newValue, setLoading)
                    }
                ]
            })
        } else if (newValue && newValue.inputValue) {
            setPendingName(newValue.inputValue);
            uiContext.setAlert({
                open: true,
                title: 'Add New State',
                message: 'Are you sure you want to add this state?',
                severity: 'warning',
                actions: [
                    { 
                        label: 'Cancel', 
                        onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) 
                    },
                    {
                        label: 'Add',
                        onClick: (setLoading) => addState(newValue.inputValue, setLoading)
                    }
                ]
            })
        } else {
            setValue(newValue);
            onChange?.(newValue);
        }
    }

    const filterOptionsHandler = (
        options: StateFieldType[],
        params: FilterOptionsState<StateFieldType>
    ) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
                id: 0
            });
        }

        return filtered;
    }

    const getOptionLabelHandler = (option: StateFieldType | string) => {
        if (typeof option === 'string') return option;
        if (option.inputValue) return option.inputValue;
        return option.name;
    }

    const getStateOptions = async () => {
        try {
            const response = await api.get('/api/stock/state');
            setStateOptions(response.data);
        } catch (error) {
            setStateOptions([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getStateOptions();
    }, []);

    return {
        value,
        loading,
        stateOptions,
        handleClose,
        addState,
        changeValueHandler,
        filterOptionsHandler,
        getOptionLabelHandler
    }
}
