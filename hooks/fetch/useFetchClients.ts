import { ClientContextType } from "@/components/Client/ContextProvider";
import api from "@/lib/axios";
import { Client } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchClients(context?: ClientContextType) {
    const [clients, setClients] = useState<Client[]>([]);
    const [loadingClients, setLoadingClients] = useState(false);

    const fetchClients = async () => {
        const response = await api.get('/api/service/client');

        if (context) {
            context.setClients(response.data);
        } else {
            setClients(response.data);
        }

        setLoadingClients(false);
    }

    useEffect(() => {
        fetchClients();
    }, []);

    return { clients, loadingClients, setClients };
}
