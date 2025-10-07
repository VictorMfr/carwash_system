import { TypeContextType } from "@/components/Type/ContextProvider";
import api from "@/lib/axios";
import { Type } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchTypes(context?: TypeContextType) {
    const [types, setTypes] = useState<Type[]>([]);
    const [loadingTypes, setLoadingTypes] = useState(false);

    const fetchTypes = async () => {
        const response = await api.get('/api/finance/type');

        if (context) {
            context.setTypes(response.data);
        } else {
            setTypes(response.data);
        }

        setLoadingTypes(false);
    }

    useEffect(() => {
        fetchTypes();
    }, []);

    return { types, loadingTypes, setTypes };
}
