import { useEffect, useState } from "react";
import { ProductFieldType } from "./Product/ProductField";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

interface FormDataType {
    product: number | ProductFieldType;
    unit: string;
    isTool: number;
    minimum_quantity: number;
}

interface DetailType {
    id: string;
    brand: any;
    state: any;
    quantity: number;
    price: number;
    entryDate: Date | null;
    image: {
        file: File | null;
        preview: string | null;
        name: string;
    };
}

export default function useStockFormController() {
    const uiContext = useUIDisplayControls();

    const [formData, setFormData] = useState<FormDataType>({
        product: 0,
        unit: '',
        isTool: 0,
        minimum_quantity: 0
    });

    const [details, setDetails] = useState<DetailType[]>([]);

    const handleProductChange = (data: any) => {
        setFormData({ ...formData, product: data });
    }

    const handleUnitChange = (data: any) => {
        setFormData({ ...formData, unit: data });
    }

    const handleIsToolChange = (data: any) => {
        setFormData({ ...formData, isTool: data });
    }

    const addDetail = () => {
        const newDetail: DetailType = {
            id: `detail-${Date.now()}`,
            brand: null,
            state: null,
            quantity: 0,
            price: 0,
            entryDate: null,
            image: {
                file: null,
                preview: null,
                name: ''
            }
        };
        setDetails(prev => [...prev, newDetail]);
    }

    const removeDetail = () => {
        setDetails(prev => prev.slice(0, -1));
    }

    const updateDetail = (id: string, updatedDetail: Partial<DetailType>) => {
        setDetails(prev => 
            prev.map(detail => 
                detail.id === id ? { ...detail, ...updatedDetail } : detail
            )
        );
    }

    const fetchIfProductHasStock = async (product: number | ProductFieldType) => {
        if (product && typeof product === 'object') {
            try {
                uiContext.setScreenLoading(true);
                const response = await api.get(`/api/stock/product/${product.id}/ref`);

                if (response.data) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        unit: product.unit,
                        isTool: product.isTool ? 1 : 0,
                        minimum_quantity: response.data.minimum_quantity || prevFormData.minimum_quantity
                    }));
                } else {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        unit: product.unit,
                        isTool: product.isTool ? 1 : 0
                    }));
                }
            } catch (error) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    unit: product.unit,
                    isTool: product.isTool ? 1 : 0
                }));
            } finally {
                uiContext.setScreenLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchIfProductHasStock(formData.product)
    }, [formData.product]);

    return {
        formData,
        setFormData,
        handleProductChange,
        handleUnitChange,
        handleIsToolChange,
        details,
        addDetail,
        removeDetail,
        updateDetail
    }
}