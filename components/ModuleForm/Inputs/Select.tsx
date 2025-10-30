import { FormDataField } from "@/types/form/form";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useInputController from "./InputController";

export default function SelectField({
    dataField
}: {
    dataField: FormDataField
}) {

    const { value, error, changeFieldHandler, disabled } = useInputController({ dataField });

    return (
        <FormControl fullWidth>
            <InputLabel
                id={`${dataField.field}-label`}
                error={!!error}
            >{dataField.inputConfig?.select?.label}</InputLabel>
            <Select

                labelId={`${dataField.field}-label`}
                label={dataField.inputConfig?.select?.label}
                value={value}
                onChange={changeFieldHandler}
                error={!!error}
                disabled={disabled}
            >
                {dataField.inputConfig?.select?.options.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
            <FormHelperText error={!!error}>{error}</FormHelperText>
        </FormControl>
    )
}