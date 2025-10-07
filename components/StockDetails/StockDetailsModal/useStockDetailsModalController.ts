import { useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useUIDisplayControls } from '../../../hooks/UIDisplayControlsProvider';
import { useStockDetailsContext } from '../ContextProvider';
import api from '@/lib/axios';

const steps = ['Fill the fields', 'Add an image'];

interface FormData {
    quantity: string;
    price: string;
    entryDate: Dayjs | null;
    image: File | null;
    existingImageUrl: string | null;
    brand: any | null;
    state: any | null;
}

export default function useStockModalController() {
    const uiContext = useUIDisplayControls();
    const stockDetailsContext = useStockDetailsContext();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [isToolLoading, setIsToolLoading] = useState(true);
    const [isTool, setIsTool] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        quantity: '',
        price: '',
        entryDate: null,
        image: null,
        existingImageUrl: null,
        brand: null,
        state: null
    });

    // Fetch stock to determine isTool from Product
    useEffect(() => {
        const fetchIsTool = async () => {
            try {
                setIsToolLoading(true);
                const stockId = stockDetailsContext.stock?.id || stockDetailsContext.stockId;
                if (!stockId) {
                    setIsTool(false);
                    return;
                }
                const response = await api.get(`/api/stock/${stockId}`);
                // The API flattens Product info; check nested or flattened properties safely
                const data: any = response.data;
                const product = data?.product ?? data?.Product ?? null;
                const derivedIsTool = Boolean(product?.isTool ?? product?.is_tool ?? data?.isTool ?? data?.is_tool);
                setIsTool(derivedIsTool);
            } catch (error) {
                console.error('Error fetching stock to determine isTool:', error);
                setIsTool(false);
            } finally {
                setIsToolLoading(false);
            }
        };
        if (stockDetailsContext.modal.open) {
            fetchIsTool();
        }
    }, [stockDetailsContext.modal.open, stockDetailsContext.stockId, stockDetailsContext.stock]);

    // Populate form when modal opens in update mode
    useEffect(() => {
        if (stockDetailsContext.modal.open && stockDetailsContext.modal.type === 'update' && stockDetailsContext.modal.detail) {
            const detail = stockDetailsContext.modal.detail;
            setFormData({
                quantity: isTool ? '1' : (detail.quantity?.toString() || ''),
                price: detail.price?.toString() || '',
                entryDate: detail.entry_date ? dayjs(detail.entry_date) : null,
                image: null, // New image file (if user uploads one)
                existingImageUrl: detail.picture || null, // Existing image URL from database
                brand: detail.brand || null,
                state: detail.state || null
            });
        } else if (stockDetailsContext.modal.open && stockDetailsContext.modal.type === 'add') {
            // Reset form when opening in add mode
            resetForm();
        }
    }, [stockDetailsContext.modal.open, stockDetailsContext.modal.type, stockDetailsContext.modal.detail, isTool]);

    // Ensure quantity is always '1' when isTool is true
    useEffect(() => {
        if (isTool && formData.quantity !== '1') {
            setFormData(prev => ({
                ...prev,
                quantity: '1'
            }));
        }
    }, [isTool, formData.quantity]);

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleInputChange = (field: keyof FormData, value: string | Dayjs | File | null) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            quantity: isTool ? '1' : '',
            price: '',
            entryDate: null,
            image: null,
            existingImageUrl: null,
            brand: null,
            state: null
        });
        setActiveStep(0);
        setSkipped(new Set<number>());
    };

    const validateForm = (): boolean => {
        if (!isTool && (!formData.quantity || formData.quantity.trim() === '')) {
            uiContext.setSnackbar({
                open: true,
                message: 'Quantity is required',
                severity: 'error'
            });
            return false;
        }

        if (!formData.price || formData.price.trim() === '') {
            uiContext.setSnackbar({
                open: true,
                message: 'Price is required',
                severity: 'error'
            });
            return false;
        }

        if (!formData.entryDate) {
            uiContext.setSnackbar({
                open: true,
                message: 'Entry date is required',
                severity: 'error'
            });
            return false;
        }

        if (!formData.brand) {
            uiContext.setSnackbar({
                open: true,
                message: 'Brand is required',
                severity: 'error'
            });
            return false;
        }

        if (!formData.state) {
            uiContext.setSnackbar({
                open: true,
                message: 'State is required',
                severity: 'error'
            });
            return false;
        }

        if (!isTool && (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0)) {
            uiContext.setSnackbar({
                open: true,
                message: 'Quantity must be a positive number',
                severity: 'error'
            });
            return false;
        }

        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            uiContext.setSnackbar({
                open: true,
                message: 'Price must be a positive number',
                severity: 'error'
            });
            return false;
        }

        return true;
    };

    const createStockDetail = async () => {
        if (!validateForm()) {
            return;
        }

        uiContext.setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('quantity', formData.quantity);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('entry_date', formData.entryDate!.format('YYYY-MM-DD'));
            formDataToSend.append('brandId', formData.brand.id.toString());
            formDataToSend.append('stateId', formData.state.id.toString());
            
            if (formData.image) {
                formDataToSend.append('picture', formData.image);
            }

            // Get the stock ID from the context
            const stockId = stockDetailsContext.stock?.id || stockDetailsContext.stockId;
            if (!stockId) {
                throw new Error('Stock ID not found');
            }

            const response = await api.post(`/api/stock/${stockId}/details`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            uiContext.setSnackbar({
                open: true,
                message: 'Stock detail created successfully',
                severity: 'success'
            });

            // Refresh the stock details list
            stockDetailsContext.refreshStockDetails();

            // Close modal and reset form
            stockDetailsContext.setModal({ open: false, type: 'add', detail: null });
            resetForm();

        } catch (error) {
            console.error('Error creating stock detail:', error);
            uiContext.setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : 'Failed to create stock detail',
                severity: 'error'
            });
        } finally {
            uiContext.setLoading(false);
        }
    };

    const updateStockDetail = async () => {
        if (!validateForm()) {
            return;
        }

        if (!stockDetailsContext.modal.detail?.id) {
            uiContext.setSnackbar({
                open: true,
                message: 'Stock detail ID not found',
                severity: 'error'
            });
            return;
        }

        uiContext.setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('quantity', formData.quantity);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('entry_date', formData.entryDate!.format('YYYY-MM-DD'));
            formDataToSend.append('brandId', formData.brand.id.toString());
            formDataToSend.append('stateId', formData.state.id.toString());
            
            if (formData.image) {
                formDataToSend.append('picture', formData.image);
            }

            const stockId = stockDetailsContext.stock?.id || stockDetailsContext.stockId;
            if (!stockId) {
                throw new Error('Stock ID not found');
            }

            const response = await api.put(`/api/stock/${stockId}/details/${stockDetailsContext.modal.detail.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            uiContext.setSnackbar({
                open: true,
                message: 'Stock detail updated successfully',
                severity: 'success'
            });

            // Refresh the stock details list
            stockDetailsContext.refreshStockDetails();

            // Close modal and reset form
            stockDetailsContext.setModal({ open: false, type: 'add', detail: null });
            resetForm();

        } catch (error) {
            console.error('Error updating stock detail:', error);
            uiContext.setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : 'Failed to update stock detail',
                severity: 'error'
            });
        } finally {
            uiContext.setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (stockDetailsContext.modal.type === 'update') {
            updateStockDetail();
        } else {
            createStockDetail();
        }
    };


    return {
        steps,
        activeStep,
        isStepSkipped,
        handleNext,
        handleBack,
        handleSkip,
        formData,
        handleInputChange,
        resetForm,
        createStockDetail,
        updateStockDetail,
        handleSubmit,
        validateForm,
        loading: uiContext.loading,
        isTool,
        isToolLoading,
    };
}