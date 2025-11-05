import { FormData } from "@/types/form/form";
import { createContext, SetStateAction, Dispatch, useContext, useState } from "react";
import { FormInput } from "./FormDataController";

export interface ModuleFormContextType {
    moduleSettings: FormData;
    setModuleSettings: Dispatch<SetStateAction<FormData>>;
    formValue: FormInput[];
    setFormValue: Dispatch<SetStateAction<FormInput[]>>;
    onSubmit?: () => void;
    onCancel?: () => void;
    loading?: boolean;
    activeStep?: number;
    setActiveStep?: Dispatch<SetStateAction<number>>;
}

const moduleFormContext = createContext<ModuleFormContextType>({
    moduleSettings: {} as FormData,
    setModuleSettings: () => { },
    formValue: [],
    setFormValue: () => { },
    onSubmit: () => { },
    onCancel: () => { },
    loading: false,
    activeStep: 0,
    setActiveStep: () => { },
});

export function useModuleFormContext() {
    const context = useContext(moduleFormContext);
    if (!context) {
        throw new Error('useModuleFormContext must be used within a ModuleFormContext');
    }
    return context;
}

export default function ModuleFormContext({
    children,
    moduleSettings,
    formValue,
    onChangeFormData,
    onSubmit,
    onCancel,
    loading,
    activeStep,
    setActiveStep,
}: {
    children: React.ReactNode,
    moduleSettings: FormData
    formValue: FormInput[],
    onChangeFormData: Dispatch<SetStateAction<FormInput[]>>;
    onSubmit?: () => void;
    onCancel?: () => void;
    loading?: boolean;
    activeStep?: number;
    setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
    const [settingsState, setSettingsState] = useState(moduleSettings);
    const [activeStepState, setActiveStepState] = useState<number>(activeStep || 0);


    // usar props si vienen, si no, fallback al estado interno
    const currentActiveStep = activeStep ?? activeStepState;
    const updateActiveStep: Dispatch<SetStateAction<number>> = setActiveStep ?? setActiveStepState;


    const ctxData = {
        moduleSettings: settingsState,
        formValue,
        setModuleSettings: setSettingsState,
        setFormValue: onChangeFormData,
        onSubmit: onSubmit,
        onCancel: onCancel,
        loading,
        activeStep: currentActiveStep,
        setActiveStep: updateActiveStep,
    }

    return (
        <moduleFormContext.Provider value={ctxData}>
            {children}
        </moduleFormContext.Provider>
    )
}