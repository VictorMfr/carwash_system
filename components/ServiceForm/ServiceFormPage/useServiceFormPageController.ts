import { useState } from 'react';
import { useUIDisplayControls } from '@/hooks/UIDisplayControlsProvider';

export interface ServiceFormData {
    switchVehicle: boolean;
    vehicle: any;
    client: any;
    switchExtras: boolean;
    extras?: { productId: number; productName: string; quantity: number }[];
    switchChange: boolean;
    dollarRate: number | null;
    amountUSD: number | null;
    amountVES: number | null;
    status: 'pending' | 'complete';
}

export default function useServiceFormController() {
    const [activeStep, setActiveStep] = useState(0);
    
    const [formData, setFormData] = useState<ServiceFormData>({
        switchVehicle: false,
        vehicle: null,
        client: null,
        switchExtras: false,
        extras: [],
        switchChange: true,
        dollarRate: null,
        amountUSD: null,
        amountVES: null,
        status: 'pending'
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