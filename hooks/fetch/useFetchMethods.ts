import { MethodContextType } from "@/components/Method/ContextProvider";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function useFetchMethods(context?: MethodContextType) {
    const [methods, setMethods] = useState<any[]>([]);
    const [loadingMethods, setLoadingMethods] = useState(true);

    const fetchMethods = async () => {
        try {
            setLoadingMethods(true);
            const response = await api.get('/api/finance/method');

            if (context) {
                context.setMethods(response.data);
                context.setLoadingMethods(false);
            } else {
                setMethods(response.data);
                setLoadingMethods(false);
            }
        } catch (error) {
            console.error('Error fetching methods:', error);
            setLoadingMethods(false);
            if (context) {
                context.setLoadingMethods(false);
            }
        }
    }

    useEffect(() => {
        fetchMethods();
    }, []);

    return { methods, loadingMethods, setMethods };
}
