import { FormDataField } from "@/types/form/form";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useInputController from "./InputController";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useModuleFormContext } from "../context";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export default function DateField({ dataField }: { dataField: FormDataField }) {

    const formCtx = useModuleFormContext(); 
    const { value, error, disabled } = useInputController({ dataField });

    const changeFieldHandler = (event: Dayjs | null) => {
        formCtx.setFormValue(prev => (
            prev.map(input => (
                input.field === dataField.field ? { 
                    ...input, value: event?.format('DD-MM-YYYY') ?? '', error: '' 
                } : input)
            )
        ));
    }

    // If the value is a date in ISO format, convert it to DD-MM-YYYY
    const isValueDateIso = dayjs(value as string).isValid();
    const valueDate = isValueDateIso ? dayjs(value as string) : dayjs(value as string, 'DD-MM-YYYY');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth>
                <DatePicker
                    slotProps={{ textField: { error: !!error } }}
                    label={dataField.headerName}
                    value={value ? valueDate : null}
                    onChange={changeFieldHandler}
                    disabled={disabled}
                    format="DD-MM-YYYY"
                />
                {error && <FormHelperText error>{error}</FormHelperText>}
            </FormControl>
        </LocalizationProvider>
    )
}