import { StockDetailsContextType } from "@/components/StockDetails/ContextProvider";
import api from "@/lib/axios";
import { StockDetails } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchStockDetails(context?: StockDetailsContextType) {
    const [details, setDetails] = useState<StockDetails[]>([]);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const fetchStockDetails = async () => {
        if (context?.stockId) {
            const response = await api.get(`/api/stock/${context.stockId}/details`);

            if (context) {
                context.setDetails(response.data);
            } else {
                setDetails(response.data);
            }

            setLoadingDetails(false);
        }
    }

    useEffect(() => {
        fetchStockDetails();
    }, [context?.stockId]);

    return { details, loadingDetails, setDetails };
}
