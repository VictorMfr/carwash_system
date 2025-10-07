import { useEffect, useState } from "react";
import { AutocompleteChangeDetails, AutocompleteChangeReason, createFilterOptions, FilterOptionsState } from "@mui/material";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

interface BrandType {
    id: number;
    name: string;
}

export interface BrandFieldType extends BrandType {
    inputValue?: string;
}

const filter = createFilterOptions<BrandFieldType>();

interface UseBrandControllerProps {
    onChange?: (brand: any) => void;
}

export default function useBrandController({ onChange }: UseBrandControllerProps = {}) {

    const uiContext = useUIDisplayControls();
    const [brandOptions, setBrandOptions] = useState<BrandFieldType[]>([]);
    const [value, setValue] = useState<BrandFieldType | null>(null);
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        setLoading(false);
    }

    const addBrand = async () => {

    }

    const changeValueHandler = (
        event: React.SyntheticEvent,
        newValue: BrandFieldType | null | string,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<BrandFieldType> | undefined
    ) => {
        if (typeof newValue === 'string') {
            uiContext.setAlert({
                open: true,
                title: 'Add New Brand',
                message: 'Are you sure you want to add this brand?',
                severity: 'warning',
                actions: [
                    { 
                        label: 'Cancel', 
                        onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) 
                    },
                    {
                        label: 'Add',
                        onClick: addBrand
                    }
                ]
            })
        } else if (newValue && newValue.inputValue) {
            uiContext.setAlert({
                open: true,
                title: 'Add New Brand',
                message: 'Are you sure you want to add this brand?',
                severity: 'warning',
                actions: [
                    { 
                        label: 'Cancel', 
                        onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) 
                    },
                    {
                        label: 'Add',
                        onClick: addBrand
                    }
                ]
            })
        } else {
            setValue(newValue);
            onChange?.(newValue);
        }
    }

    const filterOptionsHandler = (
        options: BrandFieldType[],
        params: FilterOptionsState<BrandFieldType>
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

    const getOptionLabelHandler = (option: BrandFieldType | string) => {
        if (typeof option === 'string') return option;
        if (option.inputValue) return option.inputValue;
        return option.name;
    }

    const getBrandOptions = async () => {
        try {
            const response = await api.get('/api/stock/brand');
            setBrandOptions(response.data);
        } catch (error) {
            setBrandOptions([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBrandOptions();
    }, []);

    return {
        value,
        loading,
        brandOptions,
        handleClose,
        addBrand,
        changeValueHandler,
        filterOptionsHandler,
        getOptionLabelHandler
    }
}