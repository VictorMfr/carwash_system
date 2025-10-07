import { StateContextType } from "@/components/State/ContextProvider";
import api from "@/lib/axios";
import { State } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchStates(context?: StateContextType) {
    const [states, setStates] = useState<State[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);

    const fetchStates = async () => {
        const response = await api.get('/api/stock/state');

        if (context) {
            context.setStates(response.data);
        } else {
            setStates(response.data);
        }

        setLoadingStates(false);
    }

    useEffect(() => {
        fetchStates();
    }, []);

    return { states, loadingStates, setStates };
}
