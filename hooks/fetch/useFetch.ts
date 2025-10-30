import api from "@/lib/axios";
import { AxiosRequestConfig } from "axios";
import { SetStateAction, Dispatch, useEffect, useState } from "react";

export default function useFetch<FetchData>(
    url: string,
    contextDispatch?: Dispatch<SetStateAction<FetchData>>,
    contextLoading?: Dispatch<SetStateAction<boolean>>,
) {
    const [data, setData] = useState<FetchData | any >();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get(url);
            const data = response.data;
            if (contextDispatch && contextLoading) {
                contextDispatch(data);
                contextLoading(false);
            } else {
                setData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, setData, fetchData };
}