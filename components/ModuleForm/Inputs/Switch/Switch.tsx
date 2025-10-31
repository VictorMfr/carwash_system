import { FormDataField } from "@/types/form/form";
import { FormControlLabel, Switch } from "@mui/material";
import useInputController from "../InputController";
import { useModuleFormContext } from "../../context";
import { FormInput } from "../../FormDataController";

const getDisabledFields = (
	inputs: FormInput[],
	checked: boolean,
	dataField: FormDataField,
	allFields: FormDataField[]
): FormInput[] => {
	const rules = dataField.inputConfig.switch?.disableIds ?? [];

	// Build quick lookup from rule.id (field or inputConfig.id) to actual field name
	const idToField = new Map<string, string>();
	allFields.forEach(f => {
		if (f.inputConfig?.id) idToField.set(f.inputConfig.id as string, f.field);
		idToField.set(f.field, f.field);
	});

	return inputs.map(input => {
		// Update the switch field's disabled state never; only its value is handled elsewhere
		const rule = rules.find(r => idToField.get(r.id) === input.field);
		if (!rule) {
			// Not targeted by this switch
			return checked ? input : { ...input, disabled: false };
		}

		if (checked) {
			const nextValue = rule.value !== undefined ? rule.value : input.value;
			return { ...input, value: nextValue, error: '', disabled: true };
		} else {
			return { ...input, disabled: false };
		}
	});
};

const getSwapFields = (
	inputs: FormInput[],
	checked: boolean,
	dataField: FormDataField,
	allFields: FormDataField[]
): FormInput[] => {
	const rules = dataField.inputConfig.switch?.swapIds ?? [];

	if (!rules.length) return inputs;

	const idToField = new Map<string, string>();
	const fieldToHeader = new Map<string, string>();
	allFields.forEach(f => {
		if (f.inputConfig?.id) idToField.set(f.inputConfig.id as string, f.field);
		idToField.set(f.field, f.field);
		fieldToHeader.set(f.field, f.headerName);
	});

	return inputs.map(input => {
		const rule = rules.find(r => idToField.get(r.id) === input.field || r.value.inputConfig?.id === input.field);
		if (!rule) return input;

		if (checked) {
			return { ...input, field: rule.value.field, swap: rule } as FormInput;
		} else {
			console.log('should return input', input)
			return { field: rule.id, value: '', error: input.error, disabled: input.disabled } as FormInput;
		}
	});
	
};

export default function SwitchField({ dataField }: { dataField: FormDataField }) {

    const formCtx = useModuleFormContext();
    const { value } = useInputController({ dataField });

    const changeFieldHandler = (event: any) => {
        const checked = event.target.checked;
        const allFields: FormDataField[] = [
            ...(formCtx.moduleSettings.data ?? []),
            ...((formCtx.moduleSettings.stepper?.steps ?? []).flatMap(step => step.data ?? []))
        ];

        formCtx.setFormValue(prev => {
            // Base: update the switch's own value
            let next = prev.map(input => input.field === dataField.field ? { ...input, value: checked ? true : false, error: '' } : input);

            // Apply disable rules
            next = getDisabledFields(next, checked, dataField, allFields);

            // Apply swap rules
            next = getSwapFields(next, checked, dataField, allFields);

            return next;
        });

		
    }

    return (
        <FormControlLabel
            control={(
                <Switch
                    checked={String(value) === 'true'}
                    onChange={changeFieldHandler}
                />
            )}
            label={dataField.headerName}
        />
    )
}