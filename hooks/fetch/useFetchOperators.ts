import { OperatorContextType } from "@/components/Operator/ContextProvider";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function useFetchOperators(context?: OperatorContextType) {
    const [operators, setOperators] = useState<any[]>([]);
    const [loadingOperators, setLoadingOperators] = useState(true);

    const fetchOperators = async () => {
        try {
            setLoadingOperators(true);
            const response = await api.get('/api/service/operator');

            if (context) {
                context.setOperators(response.data);
                context.setLoadingOperators(false);
            } else {
                setOperators(response.data);
                setLoadingOperators(false);
            }
        } catch (error) {
            console.error('Error fetching operators:', error);
            setLoadingOperators(false);
            if (context) {
                context.setLoadingOperators(false);
            }
        }
    }

    useEffect(() => {
        fetchOperators();
    }, []);

    return { operators, loadingOperators, setOperators };
}
