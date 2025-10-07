import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface FinanceStatisticsData {
    months: string[];
    incomes: number[];
    costs: number[];
    dollar: number[];
}

export default function useFinanceStatisticsCardController() {
    const [tab, setTab] = useState(0);
    const [statistics, setStatistics] = useState<FinanceStatisticsData>({ months: [], incomes: [], costs: [], dollar: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/api/finance/statistics');
                setStatistics(response.data);
            } catch (e) {
                setStatistics({ months: [], incomes: [], costs: [], dollar: [] });
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


