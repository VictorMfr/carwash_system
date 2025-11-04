import { FormDataField } from "@/types/form/form";
import { useModuleFormContext } from "../context";
import { Autocomplete } from "@mui/material";
import useInputController from "./InputController";
import AutocompleteModule from "@/components/ModuleAutocomplete/ModuleAutoComplete";

export default function AutoCompleteField({ 
    dataField,
    onChange,
    innerValue
 }: { 
    dataField: FormDataField
    onChange?: (value: any) => void;
    innerValue?: any;
}) {
    const formCtx = useModuleFormContext();
    const { value, error, disabled } = useInputController({ dataField });

    const changeHandler = (value: any) => {
        formCtx.setFormValue(prev => prev.map(input => input.field === dataField.field ? { ...input, value, error: '' } : input));
        onChange?.(value);
    }

    return (
        <AutocompleteModule
            autoCompleteSettings={dataField.inputConfig.autocomplete}
            onChange={changeHandler}
            error={!!error}
            helperText={error}
            value={innerValue ?? value ?? null}
            disabled={disabled}
        />
    )
}