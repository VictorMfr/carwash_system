import { BrandContextType } from "@/components/Brand/ContextProvider";
import api from "@/lib/axios";
import { Brand } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchBrands(context?: BrandContextType) {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loadingBrands, setLoadingBrands] = useState(false);

    const fetchBrands = async () => {
        const response = await api.get('/api/stock/brand');

        if (context) {
            context.setBrands(response.data);
        } else {
            setBrands(response.data);
        }

        setLoadingBrands(false);
    }

    useEffect(() => {
        fetchBrands();
    }, []);

    return { brands, loadingBrands, setBrands };
}
