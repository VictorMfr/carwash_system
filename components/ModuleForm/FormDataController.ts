import { FormData, FormDataField } from "@/types/form/form";
import { ComponentType } from "react";
import { Dispatch, SetStateAction } from "react";
import { ZodError } from "zod";
import { SwitchSwapRule } from "@/types/form/form";

export interface FormInput {
    field: string;
    value: any;
    error: string;
    disabled: boolean;
    name?: string;
    swap?: SwitchSwapRule;
}

export default function useFormDataController(settings: FormData) {
    const getInitialFormInputs = (settings: FormData) => {
        const baseForm: FormInput = { field: '', value: '', error: '', disabled: false };
    
        if (settings.data) {
            return settings.data.map((dataField) => ({
                ...baseForm,
                field: dataField.field
            }));
        }
    
        if (settings.stepper) {
            let a: FormInput[] = [];
            settings.stepper.steps.forEach(step => {
                if (!step.data) return;
                step.data.forEach(dataField => {
                    a.push({
                        ...baseForm,
                        field: dataField.field
                    });
                });
            });
            return a;
        }
    
        return [];
    }

    const validateForm = (formData: FormInput[], schema: any) => {
        try {
            schema.parse(formData);
            return false;
        } catch (error) {
            return (error as ZodError).issues.map(issue => ({
                field: issue.path[0],
                error: issue.message
            }));
        }
    }

    const sendFormErrors = (
        errors: ReturnType<typeof validateForm>, 
        setFormData: Dispatch<SetStateAction<FormInput[]>>
    ) => {
        if (!errors) return;
        setFormData(prev => prev.map(item => {
            const error = errors.find((error: any) => error.field === item.field);
            return {
                ...item,
                error: error?.error ?? item.error
            }
        }));
    }

    const initialFormInputs: FormInput[] = getInitialFormInputs(settings);

    return {
        initialFormInputs,
        getInitialFormInputs,
        validateForm,
        sendFormErrors
    }
}