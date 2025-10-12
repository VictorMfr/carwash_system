import { 
    Autocomplete, 
    AutocompleteRenderInputParams, 
    TextField
} from "@mui/material";
import { Fragment, HTMLAttributes } from "react";
import useVehicleFieldController, { VehicleFieldType } from "./useVehicleFieldController";

const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & { key: any; },
    option: VehicleFieldType
) => {
    const { key, ...optionProps } = props;
    return (
        <li key={option.id ?? key} {...optionProps}>
            {option.license_plate}
        </li>
    );
}

// if loading, show a loading spinner
const renderInput = (params: AutocompleteRenderInputParams, loading: boolean) => {
    return <TextField {...params} label={loading ? 'Cargando...' : 'Vehículo'} />
}

interface VehicleFieldProps {
    onChange?: (vehicle: any) => void;
    clientId?: number;
}

export default function VehicleField({ onChange, clientId }: VehicleFieldProps) {

    const controller = useVehicleFieldController({ onChange, clientId });

    return (
        <Fragment>
            <Autocomplete
                value={controller.value}
                onChange={controller.changeValueHandler}
                filterOptions={controller.filterOptionsHandler}
                options={controller.vehicleOptions}
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
        </Fragment>
    )
}
