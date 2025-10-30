import TextField from "./Inputs/Text";
import { FormDataField } from "@/types/form/form";
import SelectField from "./Inputs/Select";
import NumberField from "./Inputs/Number";
import DateField from "./Inputs/Date";
import SwitchField from "./Inputs/Switch/Switch";
import AutoCompleteField from "./Inputs/AutoComplete";
import { useModuleFormContext } from "./context";
import { FormInput } from "./FormDataController";
import PictureField from "./Inputs/Picture/Picture";

const RenderDataField = ({ dataField }: { dataField: FormDataField }) => {
    if (dataField.inputConfig?.select) {
        return <SelectField dataField={dataField} />
    }

    if (dataField.inputConfig?.number) {
        return <NumberField dataField={dataField} />
    }

    if (dataField.inputConfig?.switch) {
        return <SwitchField dataField={dataField} />
    }

    if (dataField.inputConfig?.date) {
        return <DateField dataField={dataField} />
    }

    if (dataField.inputConfig?.picture) {
        return <PictureField dataField={dataField} />
    }

    if (dataField.inputConfig.autocomplete) {
        return <AutoCompleteField dataField={dataField} />
    }

    return <TextField dataField={dataField} />
}

export default function FormField({ dataField }: { dataField: FormDataField }) {

    const formCtx = useModuleFormContext();
    const formInput = formCtx.formValue.find(input => {
        if (input.swap) {
            return (
                input.swap.value.inputConfig?.id === input.field && 
                input.swap.id === dataField.field
            );
        }

        return null;
    });


    if (formInput?.swap) {
        return <RenderDataField dataField={formInput.swap.value} />
    }

    return <RenderDataField dataField={dataField} />
}