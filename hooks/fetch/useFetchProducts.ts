import { ProductContextType } from "@/components/Product/ContextProvider";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function useFetchProducts(context?: ProductContextType) {
    const [products, setProducts] = useState<any[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            const response = await api.get('/api/stock/product');

            if (context) {
                context.setProducts(response.data);
                context.setLoadingProducts(false);
            } else {
                setProducts(response.data);
                setLoadingProducts(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoadingProducts(false);
            if (context) {
                context.setLoadingProducts(false);
            }
        } finally {
            setLoadingProducts(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loadingProducts, setProducts };
}