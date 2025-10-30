import { FormDataField } from "@/types/form/form";
import { ModuleFormContextType, useModuleFormContext } from "../context";
import { useEffect, useMemo } from "react";


export default function useInputController({ dataField }: { dataField: FormDataField }) {
    const formCtx = useModuleFormContext();
    const formInput = formCtx.formValue.find((input) => input.field === dataField.field);
    const value = formInput?.value;
    const error = formInput?.error;
    const disabled = formInput?.disabled;

    const changeFieldHandler = (event: any) => {
        formCtx.setFormValue(prev => prev.map(input => input.field === dataField.field ? { ...input, value: event.target.value, error: '' } : input));
    }

    return {
        value,
        error,
        changeFieldHandler,
        disabled,
    }
}