import { Grid } from "@mui/material";
import { useModuleFormContext } from "../context";
import FormField from "../FormField";

export default function GridForm() {

    const formCtx = useModuleFormContext();
    const gridSpacing = formCtx.moduleSettings.config?.gridSpacing ?? 2;
    const data = formCtx.moduleSettings.data ?? [];

    return (
        <Grid
            container
            spacing={gridSpacing}
        >
            {data.map((dataField) => (
                <Grid
                    key={dataField.field}
                    size={dataField.inputConfig?.size}
                >
                    <FormField dataField={dataField}/>
                </Grid>
            ))}
        </Grid>
    )
}