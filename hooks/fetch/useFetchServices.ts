import { ServiceContextType } from "@/components/Service/ContextProvider";
import api from "@/lib/axios";
import { Service } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchServices(context?: ServiceContextType) {
    const [services, setServices] = useState<Service[]>([]);
    const [loadingServices, setLoadingServices] = useState(false);

    const fetchServices = async () => {
        const response = await api.get('/api/service');


        console.log(response.data);
        if (context) {
            context.setServices(response.data);
        } else {
            setServices(response.data);
        }

        setLoadingServices(false);
    }

    useEffect(() => {
        fetchServices();
    }, []);

    return { services, loadingServices, setServices };
}
