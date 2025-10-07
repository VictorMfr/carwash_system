import { useEffect } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export default function useFetchHomes(context?: any) {
    const uiContext = useUIDisplayControls();

    const fetchHomes = async () => {
        try {
            context?.setLoadingHomes(true);
            const response = await api.get('/api/home');
            context?.setHomes(response.data);
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            context?.setLoadingHomes(false);
        }
    };

    useEffect(() => {
        fetchHomes();
    }, []);

    return {
        homes: context?.homes || [],
        loadingHomes: context?.loadingHomes || false,
        refetch: fetchHomes
    };
}
