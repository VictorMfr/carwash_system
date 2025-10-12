'use client';

import { Fragment, HTMLAttributes, useEffect } from "react";
import useClientFieldController from "./useClientFieldController";
import { Client } from "@/services/backend/models/associations";
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Grid,
    DialogActions,
    Button,
} from "@mui/material";

export interface ClientFieldType extends Client {
    inputValue?: string;
}

const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & { key: any; },
    option: ClientFieldType
) => {
    const { key, ...optionProps } = props;
    return (
        <li key={(option as any).id ?? (option as any).inputValue ?? key} {...optionProps}>
            {option.name} {option.lastname}
        </li>
    );
}

// if loading, show a loading spinner
const renderInput = (params: AutocompleteRenderInputParams, loading: boolean) => {
    return <TextField {...params} label={loading ? 'Cargando...' : 'Cliente'} />
}

export default function ClientField({ onChange }: { onChange: (data: any) => void }) {

    const controller = useClientFieldController();

    useEffect(() => {
        onChange(controller.value);
    }, [controller.value]);

    return (
        <Fragment>
            <Autocomplete
                fullWidth
                
                value={controller.value}
                onChange={controller.changeValueHandler}
                filterOptions={controller.filterOptionsHandler}
                options={controller.clientOptions}
                getOptionLabel={controller.getOptionLabelHandler}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={renderOption}
                freeSolo
                renderInput={(params) => renderInput(params, controller.loading)}
                disabled={controller.loading}
            />
            <Dialog 
                open={controller.open} 
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Add Client</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add a new client to the system</DialogContentText>
                    <Grid container spacing={2} marginTop={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="First Name"
                                value={controller.dialogValue.name}
                                onChange={(e) => controller.setDialogValue({ ...controller.dialogValue, name: e.target.value })}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="Last Name"
                                value={controller.dialogValue.lastname}
                                onChange={(e) => controller.setDialogValue({ ...controller.dialogValue, lastname: e.target.value })}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="Phone"
                                value={controller.dialogValue.phone}
                                onChange={(e) => controller.setDialogValue({ ...controller.dialogValue, phone: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={controller.handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        loading={controller.loading}
                        onClick={controller.handleSubmit}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
