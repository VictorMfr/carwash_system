import { StockContextType } from "@/components/Stock/ContextProvider";
import api from "@/lib/axios";
import { Stock } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchStocks(context?: StockContextType) {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loadingStocks, setLoadingStocks] = useState(false);

    const fetchStocks = async () => {
        setLoadingStocks(true);
        if (context) {
            context.setLoadingStocks(true);
        }

        try {
            const response = await api.get('/api/stock');

            if (context) {
                context.setStocks(response.data);
                context.setLoadingStocks(false);
            } else {
                setStocks(response.data);
            }

            setLoadingStocks(false);
        } catch (error) {
            setLoadingStocks(false);
            if (context) {
                context.setLoadingStocks(false);
            }
            throw error;
        }
    }

    useEffect(() => {
        fetchStocks();
    }, []);

    return { stocks, loadingStocks, setStocks };
}
