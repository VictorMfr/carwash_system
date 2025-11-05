import { useState } from "react";
import { useModuleFormContext } from "../context";
import useFormDataController from "../FormDataController";

export default function StepperFormController() {
    const formCtx = useModuleFormContext();
    const { validateForm, sendFormErrors } = useFormDataController(formCtx.moduleSettings);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [stepError, setStepError] = useState<number | false>(false);

    const handleNext = () => {
        const isValidation = formCtx.moduleSettings.stepper?.steps[activeStep]?.validation;
        if (isValidation) {
            const errors = validateForm(formCtx.formValue, isValidation);
            if (errors) {
                setStepError(activeStep);
                return sendFormErrors(errors, formCtx.setFormValue);
            }
        }
        setStepError(false);
        formCtx.setActiveStep?.(prev => prev + 1);
        setActiveStep(prev => prev + 1);
    }

    const handleBack = () => {
        setStepError(false);
        if (formCtx.activeStep === 0 || activeStep === 0) {
            formCtx.onCancel?.();
            return;
        }

        formCtx.setActiveStep?.(prev => prev - 1);
        setActiveStep(prev => prev - 1);
    }

    return {
        activeStep,
        handleNext,
        handleBack,
        stepError,
    }
}