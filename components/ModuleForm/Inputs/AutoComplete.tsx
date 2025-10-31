import { FormDataField } from "@/types/form/form";
import { useModuleFormContext } from "../context";
import { Autocomplete } from "@mui/material";
import useInputController from "./InputController";
import AutocompleteModule from "@/components/ModuleAutocomplete/ModuleAutoComplete";

export default function AutoCompleteField({ dataField }: { dataField: FormDataField }) {
    const formCtx = useModuleFormContext();
    const { value, error, disabled } = useInputController({ dataField });

    const changeHandler = (value: any) => {
        formCtx.setFormValue(prev => prev.map(input => input.field === dataField.field ? { ...input, value, error: '' } : input));
    }

    return (
        <AutocompleteModule
            autoCompleteSettings={dataField.inputConfig.autocomplete}
            onChange={changeHandler}
            error={!!error}
            helperText={error}
            value={value ?? null}
            disabled={disabled}
        />
    )
}