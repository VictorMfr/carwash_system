import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { Fragment, HTMLAttributes } from "react";
import usePaymentMethodController, { PaymentMethodType } from "./usePaymentMethodController";

const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & { key: any; },
    option: PaymentMethodType
) => {
    const { key, ...optionProps } = props;
    return (
        <li key={option.id ?? (option as any).inputValue ?? key} {...optionProps}>
            {option.name}
        </li>
    );
}

const renderInput = (params: AutocompleteRenderInputParams, loading: boolean) => {
    return <TextField {...params} label={loading ? 'Cargando...' : 'Método de pago'} />
}

export default function PaymentMethod({ onChange }: { onChange?: (method: PaymentMethodType | null) => void }) {
    const controller = usePaymentMethodController({ onChange });

    return (
        <Fragment>
            <Autocomplete
                value={controller.value}
                onChange={controller.changeValueHandler}
                filterOptions={controller.filterOptionsHandler}
                options={controller.methodOptions}
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
    );
}


