import { useEffect, useState } from 'react';
import { useUIDisplayControls } from '@/hooks/UIDisplayControlsProvider';

export interface ServiceFormData {
    switchVehicle: boolean;
    vehicle: any;
    client: any;
}

export default function useServiceFormController() {
    const uiContext = useUIDisplayControls();
    const [activeStep, setActiveStep] = useState(0);
    
    const [formData, setFormData] = useState<ServiceFormData>({
        switchVehicle: false,
        vehicle: null,
        client: null,

    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return {
        formData,        
        activeStep,
        handleNext,
        handleBack,
        handleReset,
        setFormData
    }
}