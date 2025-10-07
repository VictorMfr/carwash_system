import { 
    Autocomplete, 
    AutocompleteRenderInputParams, 
    TextField
} from "@mui/material";
import { Fragment, HTMLAttributes } from "react";
import useBrandFieldController, { BrandFieldType } from "./useBrandFieldController";

const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & { key: any; },
    option: BrandFieldType
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
    return <TextField {...params} label={loading ? 'Loading...' : 'Brand'} />
}

interface BrandFieldProps {
    onChange?: (brand: any) => void;
}

export default function BrandField({ onChange }: BrandFieldProps) {

    const controller = useBrandFieldController({ onChange });

    return (
        <Fragment>
            <Autocomplete
                value={controller.value}
                onChange={controller.changeValueHandler}
                filterOptions={controller.filterOptionsHandler}
                options={controller.brandOptions}
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