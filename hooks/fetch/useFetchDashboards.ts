import { useEffect } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export default function useFetchDashboards(context?: any) {
    const uiContext = useUIDisplayControls();

    const fetchDashboards = async () => {
        try {
            context?.setLoadingDashboards(true);
            const response = await api.get('/api/dashboard');
            context?.setDashboards(response.data);
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            context?.setLoadingDashboards(false);
        }
    };

    useEffect(() => {
        fetchDashboards();
    }, []);

    return {
        dashboards: context?.dashboards || [],
        loadingDashboards: context?.loadingDashboards || false,
        refetch: fetchDashboards
    };
}
