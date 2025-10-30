import { useState } from "react";
import { useModuleFormContext } from "../context";
import useFormDataController from "../FormDataController";

export default function StepperFormController() {
    const formCtx = useModuleFormContext();
    const { validateForm, sendFormErrors } = useFormDataController(formCtx.moduleSettings);
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleNext = () => {
        const isValidation = formCtx.moduleSettings.stepper?.steps[activeStep]?.validation;
        if (isValidation) {
            const errors = validateForm(formCtx.formValue, isValidation);
            if (errors) return sendFormErrors(errors, formCtx.setFormValue);
        }

        setActiveStep(prev => prev + 1);
    }

    const handleBack = () => {
        if (activeStep === 0) {
            formCtx.onCancel?.();
            return;
        }
        setActiveStep(prev => prev - 1);
    }

    return {
        activeStep,
        handleNext,
        handleBack,
    }
}