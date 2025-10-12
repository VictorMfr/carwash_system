import { useEffect, useState } from "react";
import { AutocompleteChangeDetails, AutocompleteChangeReason, createFilterOptions, FilterOptionsState } from "@mui/material";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

interface VehicleType {
    id: number;
    license_plate: string;
}

export interface VehicleFieldType extends VehicleType {
    inputValue?: string;
}

const filter = createFilterOptions<VehicleFieldType>();

interface UseVehicleControllerProps {
    onChange?: (vehicle: any) => void;
    clientId?: number;
}

export default function useVehicleController({ onChange, clientId }: UseVehicleControllerProps = {}) {

    const uiContext = useUIDisplayControls();
    const [vehicleOptions, setVehicleOptions] = useState<VehicleFieldType[]>([]);
    const [value, setValue] = useState<VehicleFieldType | null>(null);
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        setLoading(false);
    }

    const addVehicle = async () => {

    }

    const changeValueHandler = (
        event: React.SyntheticEvent,
        newValue: VehicleFieldType | null | string,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<VehicleFieldType> | undefined
    ) => {
        if (typeof newValue === 'string') {
            uiContext.setAlert({
                open: true,
                title: 'Add New Vehicle',
                message: 'Are you sure you want to add this vehicle?',
                severity: 'warning',
                actions: [
                    { 
                        label: 'Cancel', 
                        onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) 
                    },
                    {
                        label: 'Add',
                        onClick: addVehicle
                    }
                ]
            })
        } else if (newValue && newValue.inputValue) {
            uiContext.setAlert({
                open: true,
                title: 'Add New Vehicle',
                message: 'Are you sure you want to add this vehicle?',
                severity: 'warning',
                actions: [
                    { 
                        label: 'Cancel', 
                        onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) 
                    },
                    {
                        label: 'Add',
                        onClick: addVehicle
                    }
                ]
            })
        } else {
            setValue(newValue);
            onChange?.(newValue);
        }
    }

    const filterOptionsHandler = (
        options: VehicleFieldType[],
        params: FilterOptionsState<VehicleFieldType>
    ) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                // keep a consistent shape for label rendering
                license_plate: params.inputValue,
                id: 0
            });
        }

        return filtered;
    }

    const getOptionLabelHandler = (option: VehicleFieldType | string) => {
        if (typeof option === 'string') return option;
        if (option.inputValue) return option.inputValue;
        return option.license_plate ?? '';
    }

    const getVehicleOptions = async () => {
        try {
            const endpoint = clientId ? `/api/client/${clientId}/vehicles` : '/api/service/vehicle';
            const response = await api.get(endpoint);
            setVehicleOptions(response.data);
        } catch (error) {
            setVehicleOptions([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getVehicleOptions();
        // re-fetch when clientId changes
    }, [clientId]);

    return {
        value,
        loading,
        vehicleOptions,
        handleClose,
        addVehicle,
        changeValueHandler,
        filterOptionsHandler,
        getOptionLabelHandler
    }
}
