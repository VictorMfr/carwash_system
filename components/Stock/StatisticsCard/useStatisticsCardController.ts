import { useState, useEffect } from "react";
import api from "@/lib/axios";

interface StatisticsData {
    productsByBrand: { id: number; value: number; label: string }[];
    productsByState: { id: number; value: number; label: string }[];
    consumptionData: { id: number; value: number; label: string }[];
    costData: { month: string; cost: number }[];
}

export default function useStatisticsCard() {
    const [tab, setTab] = useState(0);
    const [statistics, setStatistics] = useState<StatisticsData>({ productsByBrand: [], productsByState: [], consumptionData: [], costData: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/api/stock/statistics');
                setStatistics(response.data);
            } catch (e) {
                setStatistics({ productsByBrand: [], productsByState: [], consumptionData: [], costData: [] });
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