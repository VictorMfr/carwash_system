import { FormData } from "@/types/form/form";
import ModuleFormContext from "./context";
import Form from "./Form";
import { Dispatch, SetStateAction } from "react";
import { FormInput } from "./FormDataController";

/**
    Para consumir los beneficios de este componete, notese que se debe
    especificar el tipo de formulario y los datos iniciales del formulario.

    Se debe especificar de la siguiente forma:
    
    @example

    export default function SettingsPage() {

    const { initialFormInputs, validateForm, sendFormErrors } = useFormDataController(settingsModule);
    const [formData, setFormData] = useState<FormInput[]>(initialFormInputs);

    const validateFormData = () => {
        const errors = validateForm(formData, FormSchema);
        if (errors) return sendFormErrors(errors, setFormData);
    }

    return (
        <Fragment>
            <ModuleForm
                settings={settingsModule}
                formValue={formData}
                onChangeFormData={setFormData}
                onSubmit={validateFormData} // inside submit
            />
            <Button onClick={validateFormData}>outside submit</Button>
        </Fragment>
        );
    }
    
    @param settings - Los settings del formulario, es el objeto de configuracion
    @param formValue - El valor del formulario
    @param onChangeFormData - La función para cambiar el valor del formulario
    @param onSubmit - La función para enviar el formulario, USO EXCLUSIVO PARA STEPPER
    @param loading - El estado de carga del formulario
*/

export default function ModuleForm({
    settings,
    formValue,
    onChangeFormData,
    onSubmit,
    onCancel,
    loading,
    activeStep,
    setActiveStep,
}: {
    settings: FormData,
    formValue: FormInput[],
    onChangeFormData: Dispatch<SetStateAction<FormInput[]>>;
    onSubmit?: () => void;
    onCancel?: () => void;
    loading?: boolean;
    activeStep?: number;
    setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
    return (
        <ModuleFormContext
            moduleSettings={settings}
            formValue={formValue}
            onChangeFormData={onChangeFormData}
            onSubmit={onSubmit}
            onCancel={onCancel}
            loading={loading}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
        >
            <Form />
        </ModuleFormContext>
    );
}