import { FormDataField } from "@/types/form/form";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from "@mui/material";
import { Fragment, useEffect, useMemo } from "react";
import useInputController from "./InputController";
import { useModuleFormContext } from "../context";

export default function NumberField({ dataField, onChange, innerValue }: { dataField: FormDataField, onChange?: (value: number) => void, innerValue?: number }) {

    const { value, error, disabled } = useInputController({ dataField });

    const formCtx = useModuleFormContext();
    const Adornment = dataField.inputConfig?.number?.adornment;
    const adornmentPosition = dataField.inputConfig?.number?.adornmentPosition;

    const changeFieldHandler = (event: any) => {
        formCtx.setFormValue(prev => prev.map(input => input.field === dataField.field ? { ...input, value: Number(event.target.value), error: '' } : input));
        onChange?.(Number(event.target.value));
    }

    const adornment = (
        <Fragment>
            {Adornment && <InputAdornment position={adornmentPosition ?? 'start'}>
                <Adornment />
            </InputAdornment>}
        </Fragment>
    );


    return (
        <FormControl fullWidth>
            <InputLabel id={`${dataField.field}-label`} error={!!error}>{dataField.headerName}</InputLabel>
            <OutlinedInput
                id={`${dataField.field}-label`}
                type="number"
                value={innerValue ?? value ?? null}
                onChange={changeFieldHandler}
                fullWidth
                label={dataField.headerName}
                error={!!error}
                startAdornment={adornmentPosition === 'start' ? adornment : undefined}
                endAdornment={adornmentPosition === 'end' ? adornment : undefined}
                disabled={disabled}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
    )
}