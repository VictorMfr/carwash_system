import { ServiceContextType } from "@/components/Service/ContextProvider";
import api from "@/lib/axios";
import { Service } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchServices(context?: ServiceContextType) {
    const [services, setServices] = useState<Service[]>([]);
    const [loadingServices, setLoadingServices] = useState(false);

    const fetchServices = async () => {
        try {
            if (context) context.setLoadingServices(true); else setLoadingServices(true);
            const response = await api.get('/api/service');
            if (context) {
                context.setServices(response.data);
            } else {
                setServices(response.data);
            }
        } finally {
            if (context) context.setLoadingServices(false); else setLoadingServices(false);
        }
    }

    useEffect(() => {
        fetchServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return context
        ? { services: context.services as any, loadingServices: context.loadingServices, setServices: context.setServices as any }
        : { services, loadingServices, setServices };
}
