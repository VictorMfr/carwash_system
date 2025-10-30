import { FormDataField } from "@/types/form/form";
import { useModuleFormContext } from "../context";
import { TextField as MuiTextField } from "@mui/material";
import useInputController from "./InputController";


export default function TextField({ dataField }: { dataField: FormDataField }) {
    
    const { value, error, changeFieldHandler, disabled } = useInputController({ dataField }); 

    return (
        <MuiTextField
            value={value}
            onChange={changeFieldHandler}
            fullWidth
            variant="outlined"
            label={dataField.headerName}
            error={!!error}
            helperText={error}
            disabled={disabled}
            {...dataField.inputConfig.TextFieldProps}
        />
    )
}