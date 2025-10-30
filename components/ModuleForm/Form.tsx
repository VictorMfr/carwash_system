import { Grid, Typography } from "@mui/material";
import { useModuleFormContext } from "./context";
import StepperForm from "./StepperForm/StepperForm";
import GridForm from "./GridForm/GridForm";


export default function Form() {

    const formCtx = useModuleFormContext();

    if (formCtx.moduleSettings.data) {
        return <GridForm/>
    }

    if (formCtx.moduleSettings.stepper) {
        return <StepperForm/>
    }

    return (
        <Typography variant="h6">No hay estructura de formulario</Typography>
    )
}