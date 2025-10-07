import { useState, useEffect } from "react";
import api from "@/lib/axios";

interface ServiceStatisticsData {
    servicesByRecipe: { id: number; value: number; label: string }[];
    servicesByVehicle: { id: number; value: number; label: string }[];
    servicesByOperator: { id: number; value: number; label: string }[];
    servicesByMonth: { month: string; count: number }[];
}

export default function useServiceStatisticsCardController() {
    const [tab, setTab] = useState(0);
    const [statistics, setStatistics] = useState<ServiceStatisticsData>({ 
        servicesByRecipe: [], 
        servicesByVehicle: [], 
        servicesByOperator: [], 
        servicesByMonth: [] 
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/api/service/statistics');
                setStatistics(response.data);
            } catch (e) {
                setStatistics({ 
                    servicesByRecipe: [], 
                    servicesByVehicle: [], 
                    servicesByOperator: [], 
                    servicesByMonth: [] 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return {
        tab,
        setTab,
        statistics,
        loading
    }
}
