import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import ModuleForm from "../ModuleForm";
import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { AutocompleteModule } from "../../types/autocomplete/autocomplete";
import useFormDataController, { FormInput } from "../ModuleForm/FormDataController";
import { FormData } from "@/types/form/form";


export default function ModuleAutocompleteModal({
    openModal,
    setOpenModal,
    autoCompleteSettings,
    setValue,
}: {
    openModal: { open: boolean, inputValue: string };
    setOpenModal: (openModal: { open: boolean, inputValue: string }) => void;
    autoCompleteSettings: AutocompleteModule;
    setValue: (value: any) => void;
}) {

    const [loading, setLoading] = useState(false);
    const uiContext = useUIDisplayControls();

    const modalSettings: FormData & { url: string } = useMemo(() => ({
        ...(autoCompleteSettings.formData?.columns ?? { url: autoCompleteSettings.url }),
        url: autoCompleteSettings.url
    }), [autoCompleteSettings]);

    const { initialFormInputs, validateForm, sendFormErrors } = useFormDataController(modalSettings);
    const [formValue, setFormValue] = useState<FormInput[]>(initialFormInputs);

    useEffect(() => {
        if (!openModal.open) return;
        const fill = autoCompleteSettings.formData?.createFillField;
        if (!fill) return;
        setFormValue(prev => prev.map(i => i.field === fill ? { ...i, value: openModal.inputValue } : i));
    }, [openModal.open, openModal.inputValue, autoCompleteSettings.formData?.createFillField]);
    const handleClose = () => {
        setOpenModal({ open: false, inputValue: '' });
    }

    const handleSubmit = async () => {
        try {

            if (autoCompleteSettings.config?.validation) {
                const error = validateForm(formValue, autoCompleteSettings.config.validation);
                if (error) return sendFormErrors(error, setFormValue);
            }


            setLoading(true);
            const payload = formValue.reduce((acc, cur) => {
                acc[cur.field] = cur.value;
                return acc;
            }, {} as Record<string, any>);

            const response = await api.post(autoCompleteSettings.url, payload);
            uiContext.setSnackbar({ open: true, message: autoCompleteSettings.confirm?.successMessage ?? 'Agregado correctamente', severity: 'success' });

            const labelKey = autoCompleteSettings.formData?.createFillField ?? autoCompleteSettings.labelField ?? 'name';
            
            setValue(response.data);
            handleClose();
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    if (!autoCompleteSettings.formData?.columns) return null;

    return (
        <Dialog open={openModal.open}>
            <DialogContent>
                <Stack spacing={2} marginBottom={4}>
                    <Typography variant="h6">{autoCompleteSettings.config?.create?.name}</Typography>
                    <Typography variant="body1">{autoCompleteSettings.config?.create?.description}</Typography>
                </Stack>

                <ModuleForm
                    settings={modalSettings}
                    formValue={formValue}
                    onChangeFormData={setFormValue}
                />
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        onClick={handleSubmit}
                        loading={loading}
                    >Agregar</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}