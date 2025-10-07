import { useEffect } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export default function useFetchMarketings(context?: any) {
    const uiContext = useUIDisplayControls();

    const fetchMarketings = async () => {
        try {
            context?.setLoadingMarketings(true);
            const response = await api.get('/api/marketing');
            context?.setMarketings(response.data);
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            context?.setLoadingMarketings(false);
        }
    };

    useEffect(() => {
        fetchMarketings();
    }, []);

    return {
        marketings: context?.marketings || [],
        loadingMarketings: context?.loadingMarketings || false,
        refetch: fetchMarketings
    };
}
