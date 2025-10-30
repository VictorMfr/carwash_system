import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export default function useFetchStats(url: string, config: any, uiContext: any) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await api.post(url, config);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.log('error', error);
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading };
}