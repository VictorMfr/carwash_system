'use client';

import { Autocomplete, FormControl, FormHelperText, Skeleton, TextField, createFilterOptions } from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState, useCallback } from "react";
import withUIDisplayControls from '../../HOC/withUIDisplayControls';
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import ModuleAutocompleteModal from "./Modal";
import { AutocompleteModule } from "../../types/autocomplete/autocomplete";
import useFetch from "@/hooks/fetch/useFetch";

const filter = createFilterOptions<any>();

const ModuleAutocomplete = ({
    autoCompleteSettings,
    onChange,
    error,
    helperText,
    value,
    disabled
}: {
    autoCompleteSettings: AutocompleteModule
    onChange: (value: any) => void;
    error: boolean;
    helperText: string;
    value: any;
    disabled: boolean;
}) => {
    const defaultInputValue = (typeof autoCompleteSettings.loadingType === 'object') ?
        autoCompleteSettings.loadingType.loadingText : autoCompleteSettings.label;

    const uiContext = useUIDisplayControls();
    // Build URL with optional query params
    const urlWithQuery = useMemo(() => {
        if (!autoCompleteSettings.queryParams) return autoCompleteSettings.url;
        const params = new URLSearchParams();
        Object.entries(autoCompleteSettings.queryParams).forEach(([k, v]) => params.append(k, String(v)));
        const qs = params.toString();
        return qs ? `${autoCompleteSettings.url}?${qs}` : autoCompleteSettings.url;
    }, [autoCompleteSettings.url, autoCompleteSettings.queryParams]);

    const { data, loading, setData } = useFetch(urlWithQuery);
    const [inputLabel, setInputLabel] = useState<string | undefined>(defaultInputValue);
    const [openModal, setOpenModal] = useState({
        open: false,
        inputValue: ''
    });

    useEffect(() => {
        if (autoCompleteSettings.loadingType === 'screen') {
            uiContext.setScreenLoading(loading);
        } else if (typeof autoCompleteSettings.loadingType === 'object') {
            if (loading) {
                setInputLabel(autoCompleteSettings.loadingType.loadingText);
            } else {
                setInputLabel(autoCompleteSettings.label);
            }
        }
    }, [loading]);


    const addModule = async (name: string) => {
        try {
            uiContext.setLoading(true);
            const response = await api.post(autoCompleteSettings.url, {
                [autoCompleteSettings.formData?.createFillField ?? autoCompleteSettings.labelField ?? 'name']: name
            });

            uiContext.setSnackbar({ open: true, message: autoCompleteSettings.confirm?.successMessage ?? 'Módulo agregado correctamente', severity: 'success' });
            uiContext.setAlert(prev => ({ ...prev, open: false }));
            setOpenModal({ open: false, inputValue: '' });

            if (autoCompleteSettings.multiple) {
                setData((prev: any[]) => [...prev, response.data]);
                onChange([...value, response.data]);
                return;
            }


            setData((prev: any[]) => [...prev, response.data]);
            onChange(response.data);

        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            uiContext.setLoading(false);
        }
    }

    const createConfirmHandler = (name: string) => {
        if (!autoCompleteSettings.confirm) return;
        uiContext.setAlert({
            open: true,
            title: autoCompleteSettings.confirm.title,
            message: autoCompleteSettings.confirm.message,
            severity: 'warning',
            actions: [
                { label: 'Cancelar', onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) },
                { label: 'Confirmar', onClick: () => addModule(name) },
            ]
        });
    }

    const changeHandler = useCallback((event: any, newValue: any) => {

        const labelKey = autoCompleteSettings.labelField ?? 'name';

        if (typeof newValue === 'string') {
            onChange({ [labelKey]: newValue });
            return;
        }

        if (newValue && typeof newValue === 'object' && newValue.inputValue) {
            if (autoCompleteSettings.confirm) createConfirmHandler(newValue.inputValue);
            if (autoCompleteSettings.formData) setOpenModal({ open: true, inputValue: newValue.inputValue });
            return;
        }

        if (autoCompleteSettings.multiple && Array.isArray(newValue)) {
            const newItem = newValue.find((item: { inputValue: string }) => item.inputValue);
            if (newItem) {
                if (autoCompleteSettings.confirm) createConfirmHandler(newItem.inputValue);
                if (autoCompleteSettings.formData) setOpenModal({ open: true, inputValue: newItem.inputValue });
                return;
            }
        }



        onChange(newValue ?? '');
    }, [autoCompleteSettings.labelField, onChange, autoCompleteSettings.confirm, autoCompleteSettings.formData]);

    const filterOptionsHandler = useCallback((options: any[], state: any) => {
        const filtered = filter(options, state);

        const isExisting = options.some(option => option.name === state.inputValue);
        if (state.inputValue !== '' && !isExisting) {
            filtered.push({
                id: 'null',
                inputValue: state.inputValue,
                name: `${autoCompleteSettings.newItemLabel}: "${state.inputValue}"`,
            });
        }
        return filtered;
    }, [autoCompleteSettings.newItemLabel]);

    const getOptionLabelHandler = (option: any) => {
        if (!autoCompleteSettings.labelField) throw new Error('labelField is required');

        if (autoCompleteSettings.multiple) {
            return option[autoCompleteSettings.labelField ?? 'name'];
        }

        if (typeof option === 'string') {
            return option;
        }

        if (option.inputValue) {
            return option.name;
        }

        return option[autoCompleteSettings.labelField];
    };

    if (autoCompleteSettings.multiple) {
        return (
            <Fragment>
                {autoCompleteSettings.loadingType === 'skeleton' && loading ? (
                    <Skeleton
                        variant="rounded"
                        height={56}
                        width={'100%'}
                    />
                ) : (
                    <FormControl fullWidth>
                        <Autocomplete
                            value={Array.isArray(value) ? value : []}
                            onChange={changeHandler}
                            fullWidth
                            multiple
                            options={data ?? []}
                            getOptionLabel={getOptionLabelHandler}
                            filterOptions={filterOptionsHandler}
                            filterSelectedOptions
                            disabled={loading || disabled}
                            renderInput={(params) => (
                                <TextField
                                    error={error}
                                    {...params}
                                    label={inputLabel}
                                />
                            )}
                            isOptionEqualToValue={(opt, val) => (opt?.id ?? opt) === (val?.id ?? val)}
                            freeSolo
                            selectOnFocus
                            handleHomeEndKeys
                            clearOnBlur
                        />
                        <FormHelperText error={error}>{helperText}</FormHelperText>
                    </FormControl>
                )}
                <ModuleAutocompleteModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    autoCompleteSettings={autoCompleteSettings}
                    setValue={(val) => onChange(val)}
                    setData={(val) => setData(val)}
                    value={value}
                    data={data}
                />
            </Fragment>
        )
    }

    return (
        <Fragment>
            {autoCompleteSettings.loadingType === 'skeleton' && loading ? (
                <Skeleton
                    variant="rounded"
                    height={56}
                    width={'100%'}
                />
            ) : (
                <FormControl fullWidth>
                    <Autocomplete

                        fullWidth
                        value={value}
                        onChange={changeHandler}
                        options={data == '' ? [] : data}
                        renderInput={params => (
                            <TextField
                                error={error}
                                {...params}
                                label={inputLabel}
                            />
                        )}
                        filterOptions={filterOptionsHandler}
                        getOptionLabel={getOptionLabelHandler}
                        isOptionEqualToValue={(opt, val) => (opt?.id ?? opt) === (val?.id ?? val)}

                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        clearOnBlur
                        disabled={loading || disabled}

                    />
                    <FormHelperText error={error}>{helperText}</FormHelperText>
                </FormControl>
            )}
            <ModuleAutocompleteModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                autoCompleteSettings={autoCompleteSettings}
                setValue={(val) => onChange(val)}
                setData={(val) => setData(val)}
                value={value}
                data={data}
            />
        </Fragment>
    )
}

export default withUIDisplayControls(ModuleAutocomplete);