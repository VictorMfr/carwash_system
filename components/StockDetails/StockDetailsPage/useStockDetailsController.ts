import api from "@/lib/axios";
import { StockDetailsContextType } from "../ContextProvider";
import useFetchStockDetails from "@/hooks/fetch/useFetchStockDetails";
import { useEffect } from "react";

export default function useStockDetailsController(context: StockDetailsContextType) {
    const { details, loadingDetails } = useFetchStockDetails(context);

    const getStates = async () => {
        const response = await api.get('/api/stock/state');
        context?.setStates(response.data);
    }

    const getBrands = async () => {
        const response = await api.get('/api/stock/brand');
        context?.setBrands(response.data);
    }

    const getStock = async () => {
        const response = await api.get(`/api/stock/${context?.stockId}`);
        context?.setStock(response.data);
        context?.setSelectedStock(response.data);
    }
    
    useEffect(() => {
        getStock();
        getStates();
        getBrands();
    }, [context.stockId]);

    return {
        details,
        loadingDetails
    }
}
