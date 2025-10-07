import { 
    Autocomplete, 
    AutocompleteRenderInputParams, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormControl, 
    Select, 
    InputLabel, 
    Grid, 
    TextField, 
    MenuItem 
} from "@mui/material";
import { Fragment, HTMLAttributes } from "react";
import useStateFieldController, { StateFieldType } from "./useStateFieldController";

const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & { key: any; },
    option: StateFieldType
) => {
    const { key, ...optionProps } = props;
    return (
        <li key={key} {...optionProps}>
            {option.name}
        </li>
    );
}

// if loading, show a loading spinner
const renderInput = (params: AutocompleteRenderInputParams, loading: boolean) => {
    return <TextField {...params} label={loading ? 'Loading...' : 'State'} />
}

interface StateFieldProps {
    onChange?: (state: any) => void;
}

export default function StateField({ onChange }: StateFieldProps) {

    const controller = useStateFieldController({ onChange });

    return (
        <Fragment>
            <Autocomplete
                value={controller.value}
                onChange={controller.changeValueHandler}
                filterOptions={controller.filterOptionsHandler}
                options={controller.stateOptions}
                getOptionLabel={controller.getOptionLabelHandler}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={renderOption}
                freeSolo
                renderInput={(params) => renderInput(params, controller.loading)}
                disabled={controller.loading}
            />
        </Fragment>
    )
}
