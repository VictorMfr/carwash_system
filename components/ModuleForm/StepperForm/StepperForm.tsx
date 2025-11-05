import { Stack, StepContent, StepLabel, Step, Stepper, Typography, Button, Box } from "@mui/material";
import { useModuleFormContext } from "../context";
import { Fragment } from "react";
import StepperFormController from "./StepperFormController";
import ModuleForm from "..";

export default function StepperForm() {
    const formCtx = useModuleFormContext();
    const controller = StepperFormController();

    if (!formCtx.moduleSettings.stepper) return (
        <Typography variant="h6">No hay estructura de formulario de Stepper</Typography>
    );

    if (!formCtx.moduleSettings.stepper.steps) return (
        <Typography variant="h6">No hay pasos en el formulario de Stepper</Typography>
    );

    const currentStep = formCtx.activeStep ?? controller.activeStep;

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {formCtx.moduleSettings.stepper.steps[formCtx.activeStep || controller.activeStep].title && (
                <Typography variant="h5">{formCtx.moduleSettings.stepper.steps[formCtx.activeStep || controller.activeStep].title}</Typography>
            )}
            {formCtx.moduleSettings.stepper.steps[formCtx.activeStep || controller.activeStep].description && (
                <Typography variant="body1">{formCtx.moduleSettings.stepper.steps[formCtx.activeStep || controller.activeStep].description}</Typography>
            )}
            <Stepper
                activeStep={formCtx.activeStep ?? controller.activeStep}
                orientation={formCtx.moduleSettings.stepper.orientation}

            >
                {formCtx.moduleSettings.stepper.steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel error={controller.stepError === index}>{step.label}</StepLabel>
                        {formCtx.moduleSettings.stepper?.orientation === 'vertical' && (
                            <StepContent>
                                <ModuleForm
                                    settings={{
                                        data: step.data,
                                        config: step.config
                                    }}
                                    formValue={formCtx.formValue}
                                    onChangeFormData={formCtx.setFormValue}
                                />
                            </StepContent>
                        )}
                    </Step>
                ))}
            </Stepper>

            {formCtx.moduleSettings.stepper.orientation === 'horizontal' && (
                <Fragment>
                    {formCtx.moduleSettings.stepper.steps.map((step, index) => (
                        <Box key={step.label} display={formCtx.activeStep || controller.activeStep === index ? 'block' : 'none'}>
                            <ModuleForm
                                key={step.label}
                                settings={step}
                                formValue={formCtx.formValue}
                                onChangeFormData={formCtx.setFormValue}
                            />
                        </Box>
                    ))}
                </Fragment>
            )}

            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" onClick={controller.handleBack}>
                    {currentStep === 0 ? 'Cancelar' : 'Anterior'}
                </Button>
                {((formCtx.activeStep && formCtx.activeStep < formCtx.moduleSettings.stepper.steps.length - 1) || controller.activeStep < formCtx.moduleSettings.stepper.steps.length - 1) && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={controller.handleNext}
                    >
                        Siguiente
                    </Button>
                )}
                {((formCtx.activeStep && formCtx.activeStep === formCtx.moduleSettings.stepper.steps.length - 1) || (controller.activeStep === formCtx.moduleSettings.stepper.steps.length - 1) && formCtx.onSubmit) && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={formCtx.onSubmit}
                        loading={formCtx.loading}
                    >
                        Enviar
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}