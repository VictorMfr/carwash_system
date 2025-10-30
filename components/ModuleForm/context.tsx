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
}

const moduleFormContext = createContext<ModuleFormContextType>({
    moduleSettings: {} as FormData,
    setModuleSettings: () => { },
    formValue: [],
    setFormValue: () => {},
    onSubmit: () => {},
    onCancel: () => {},
    loading: false,
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
    loading
}: {
    children: React.ReactNode,
    moduleSettings: FormData
    formValue: FormInput[],
    onChangeFormData: Dispatch<SetStateAction<FormInput[]>>;
    onSubmit?: () => void;
    onCancel?: () => void;
    loading?: boolean;
}) {
    const [settingsState, setSettingsState] = useState(moduleSettings);

    const ctxData = {
        moduleSettings: settingsState,
        formValue,
        setModuleSettings: setSettingsState,
        setFormValue: onChangeFormData,
        onSubmit: onSubmit,
        onCancel: onCancel,
        loading,
    }

    return (
        <moduleFormContext.Provider value={ctxData}>
            {children}
        </moduleFormContext.Provider>
    )
}