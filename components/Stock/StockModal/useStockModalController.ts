import { useEffect, useState } from "react";
import { useStockContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import useFetchProducts from "@/hooks/fetch/useFetchProducts";
import { handleApiError } from "@/lib/error";

const initialFormData = {
    ProductId: -1,
    minimum_quantity: 0
}

export default function useStockModalController() {

    const stockContext = useStockContext();
    const uiContext = useUIDisplayControls();
    const { products, loadingProducts } = useFetchProducts();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);


    const updateStock = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/stock/${id}`, {
                minimum_quantity: data.minimum_quantity
            });

            stockContext.setStocks(prev => prev.map((stock: any) => stock.id === Number(id) ? response.data : stock));
            setFormData(initialFormData);
            stockContext.setModal({ open: false, type: 'add', stock: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addStock = async (data: any) => {
        try {
            const response = await api.post(`/api/stock`, {
                ...data
            });
            
            stockContext.setStocks([...stockContext.stocks, response.data]);
            setFormData(initialFormData);
            stockContext.setModal({ open: false, type: 'add', stock: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        stockContext.setModal({ open: false, type: 'add', stock: null });
        setFormData(initialFormData);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (stockContext.modal.type === 'add') {
                await addStock(formData);
                uiContext.setSnackbar({ open: true, message: 'Stock added successfully', severity: 'success' });
            } else {
                await updateStock(stockContext.modal.stock.id, formData);
                uiContext.setSnackbar({ open: true, message: 'Stock updated successfully', severity: 'success' });
            }

        } catch (error) {
            uiContext.setSnackbar({ open: true, message: 'Error creating/updating stock', severity: 'error' });
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (stockContext.modal.stock) {
            if (stockContext.modal.type === 'edit') {
                console.log(stockContext.modal.stock);
                setFormData({
                    ProductId: stockContext.modal.stock.ProductId || -1,
                    minimum_quantity: stockContext.modal.stock.minimum_quantity || 0,
                });
            }
        }
    }, [stockContext.modal.stock]);


    return {
        formData,
        setFormData,
        updateStock,
        addStock,
        handleClose,
        handleSubmit,
        loading,
        products,
        loadingProducts
    }
}
