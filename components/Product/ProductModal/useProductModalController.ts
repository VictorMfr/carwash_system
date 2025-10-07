import { useEffect, useState } from "react";
import { useProductContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    name: '',
    unit: '',
    isTool: false
}

export default function useProductModalController() {

    const productContext = useProductContext();
    const uiContext = useUIDisplayControls();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const updateProduct = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/stock/product/${id}`, {
                ...data
            });

            productContext.setProducts(prev => prev.map(product => product.id === Number(id) ? response.data : product));
            setFormData(initialFormData);
            productContext.setModal({ open: false, type: 'add', product: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addProduct = async (data: any) => {
        try {
            const response = await api.post(`/api/stock/product`, {
                ...data
            });

            productContext.setProducts([...productContext.products, response.data]);
            setFormData(initialFormData);
            productContext.setModal({ open: false, type: 'add', product: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        productContext.setModal({ open: false, type: 'add', product: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (productContext.modal.type === 'add') {
                await addProduct(formData);
                uiContext.setSnackbar({ open: true, message: 'Product added successfully', severity: 'success' });
            } else {
                await updateProduct(productContext.modal.product.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Product updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating product', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (productContext.modal.product) {
            setFormData({
                name: productContext.modal.product.name || '',
                unit: productContext.modal.product.unit || '',
                isTool: productContext.modal.product.isTool || false
            });
        }
    }, [productContext.modal.product]);

    useEffect(() => {
        if (formData.isTool) {
            setFormData(prev => ({ ...prev, unit: 'u' }));
        } else {
            setFormData(prev => ({ ...prev, unit: '' }));
        }
    }, [formData.isTool]);

    return {
        formData,
        setFormData,
        updateProduct,
        addProduct,
        handleClose,
        handleSubmit,
        loading
    }
}
