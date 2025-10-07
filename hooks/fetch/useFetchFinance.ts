import { useEffect } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export default function useFetchFinance(context?: any) {
    const uiContext = useUIDisplayControls();

    const fetchFinance = async () => {
        try {
            context?.setLoadingFinance(true);
            const response = await api.get('/api/finance');
            context?.setFinance(response.data);
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            context?.setLoadingFinance(false);
        }
    };

    useEffect(() => {
        fetchFinance();
    }, []);

    return {
        finance: context?.finance || [],
        loadingFinance: context?.loadingFinance || false,
        refetch: fetchFinance
    };
}
