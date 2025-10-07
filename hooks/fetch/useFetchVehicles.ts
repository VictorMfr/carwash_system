import { VehicleContextType } from "@/components/Vehicle/ContextProvider";
import api from "@/lib/axios";
import { Vehicle } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchVehicles(context?: VehicleContextType) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(false);

    const fetchVehicles = async () => {
        const response = await api.get('/api/service/vehicle');

        if (context) {
            context.setVehicles(response.data);
        } else {
            setVehicles(response.data);
        }

        setLoadingVehicles(false);
    }

    useEffect(() => {
        fetchVehicles();
    }, []);

    return { vehicles, loadingVehicles, setVehicles };
}
