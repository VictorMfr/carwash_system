import useFormDataController, { FormInput } from "@/components/ModuleForm/FormDataController";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { FormDataField } from "@/types/form/form";
import { useEffect, useState } from "react";
import { useModuleDataGridContext } from "../context";
import { handleApiError } from "@/lib/error";
import api from "@/lib/axios";

const getPayload = (formValue: FormInput[]) => {
    return formValue.reduce((acc, cur) => {
        acc[cur.field] = cur.value;
        return acc;
    }, {} as Record<string, any>);
}

const getFormDataPayload = (formValue: FormInput[]) => {
    const formData = new FormData();
    formValue.forEach(item => {
        if (item.value instanceof Blob) {
            formData.append(item.field, item.value);
        } if (item.value instanceof Object) {
            formData.append(item.field, JSON.stringify(item.value));
        } else {
            formData.append(item.field, item.value.toString());
        }
    });
    return formData;
}

const getFormValue = (formValue: FormInput[], data: any, columns: FormDataField[], initialize: boolean = false) => {
    const filteredColumns = columns.filter(c => !c.inputConfig.hideIfUpdate);
    const formValueMap = new Map(formValue.map(i => [i.field, i] as const));

    return filteredColumns.map(col => {
        const prev = formValueMap.get(col.field);
        if (initialize) {
            const initialValue = data && data[col.field] !== undefined ? data[col.field] : (prev?.value ?? '');
            return prev ? { ...prev, value: initialValue } : { field: col.field, value: initialValue, error: '', disabled: false };
        }
        if (prev) {
            return { ...prev };
        }
        const fallbackValue = data && data[col.field] !== undefined ? data[col.field] : '';
        return { field: col.field, value: fallbackValue, error: '', disabled: false };
    });
}

export default function useModalController() {

    const datagridCtx = useModuleDataGridContext();
    const uiContext = useUIDisplayControls();
    const [loading, setLoading] = useState(false);
    const { initialFormInputs, validateForm, sendFormErrors } = useFormDataController(datagridCtx.moduleSettings.columns);
    const [formValue, setFormValue] = useState<FormInput[]>(initialFormInputs);

    

    const closingHandler = () => {
        datagridCtx.setModal({ ...datagridCtx.modal, open: false });
    }

    const handleClose = () => {
        setFormValue(initialFormInputs);
        datagridCtx.setModal({ ...datagridCtx.modal, open: false });
    }

    const handleSubmit = async () => {
        const validation = datagridCtx.modal.type === 'add' ? (
            datagridCtx.moduleSettings.config?.create?.validation ) : (
            datagridCtx.moduleSettings.config?.edit?.validation
        );

        try {
            if (validation) {
                console.log(formValue);
                const error = validateForm(formValue, validation);
                console.log(error);
                if (error) return sendFormErrors(error, setFormValue);
            }

            let payload: Record<string, any> | FormData;

            if (datagridCtx.moduleSettings.config?.create?.contentType === 'multipart/form-data') {
                payload = getFormDataPayload(formValue);
            } else {
                payload = getPayload(formValue);
            }

            const createHeaders = {
                headers: {
                    'Content-Type': datagridCtx.moduleSettings.config?.create?.contentType,
                }
            }

            const editHeaders = {
                headers: {
                    'Content-Type': datagridCtx.moduleSettings.config?.edit?.contentType,
                }
            }
            

            setLoading(true);

            if (datagridCtx.modal.type === 'add') {
                const response = await api.post(datagridCtx.moduleSettings.url, payload, createHeaders);
                datagridCtx.setFetchData([...datagridCtx.fetchData, response.data]);
            } else {
                const response = await api.put(`${datagridCtx.moduleSettings.url}/${datagridCtx.modal.data.id}`, payload, editHeaders);
                datagridCtx.setFetchData(datagridCtx.fetchData.map(item => item.id === datagridCtx.modal.data.id ? response.data : item));
            }

            const message = datagridCtx.modal.type === 'add' ? 'Agregado correctamente' : 'Actualizado correctamente';


            setFormValue(initialFormInputs);
            uiContext.setSnackbar({ open: true, message: message, severity: 'success' });
            handleClose();
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log('formValue', formValue);
    }, [formValue]);

    useEffect(() => {
        if (datagridCtx.modal.open) {
            if (datagridCtx.modal.type === 'add') {
                setFormValue(initialFormInputs);
            } else {
                const columns = datagridCtx.moduleSettings.columns.data || datagridCtx.moduleSettings.columns.stepper?.steps.map(step => step.data).flat() || [];
                const updateFormValue = getFormValue(
                    initialFormInputs, 
                    datagridCtx.modal.data, 
                    columns,
                    true
                );
                setFormValue(updateFormValue);
            }
        }
    }, [datagridCtx.modal.open]);

    return {
        modal: datagridCtx.modal,
        formValue,
        setFormValue,
        initialFormInputs,
        validateForm,
        sendFormErrors,
        loading,
        handleClose,
        handleSubmit,
        closingHandler,
        datagridCtx,
        uiContext,
        setLoading,
        getPayload,
        getFormValue
    }
}