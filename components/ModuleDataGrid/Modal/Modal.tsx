import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import ModuleForm from "../../ModuleForm";
import useModalController from "./ModalController";
import { FormDataField } from "@/types/form/form";

export default function ModuleDataGridModal() {

    const controller = useModalController();

    if (!controller.datagridCtx.moduleSettings.columns) {
        return <Typography variant="body1">No hay columnas configuradas</Typography>
    };

    const actionButtonText = controller.modal.type === 'add' ? 'Agregar' : 'Editar';
    const title = controller.modal.type === 'add' ? controller.datagridCtx.moduleSettings.config?.create?.name : controller.datagridCtx.moduleSettings.config?.edit?.name;
    const description = controller.modal.type === 'add' ? controller.datagridCtx.moduleSettings.config?.create?.description : controller.datagridCtx.moduleSettings.config?.edit?.description;


    const data = controller.datagridCtx.moduleSettings.columns

    const filterCondition = (c: FormDataField) => (
        (controller.modal.type === 'edit' && !c.inputConfig.hideIfUpdate) ||
        (controller.modal.type === 'add')
    );

    let filteredData: FormDataField[] = [];

    if (data.stepper) {
        data.stepper.steps.forEach(step => {
            step.data.forEach(field => {
                if (filterCondition(field)) {
                    filteredData.push(field);
                }
            });
        });
    } else {
        data.data?.forEach(field => {
            if (filterCondition(field)) {
                filteredData.push(field);
            }
        });
    }

    return (
        <Dialog open={controller.modal.open} onClose={controller.closingHandler}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    {description}
                </DialogContentText>
                <ModuleForm
                    settings={data}
                    formValue={controller.formValue}
                    onChangeFormData={controller.setFormValue}
                    onCancel={data.stepper ? controller.handleClose : undefined}
                    onSubmit={data.stepper ? controller.handleSubmit : undefined}
                    loading={controller.loading}
                />
            </DialogContent>
            {data.data && <DialogActions>
                <Button onClick={controller.handleClose}>Cancelar</Button>
                <Button
                    onClick={controller.handleSubmit}
                    loading={controller.loading}
                >{actionButtonText}</Button>
            </DialogActions>}
        </Dialog>
    );
}