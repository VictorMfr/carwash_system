import { VehicleModelContextType } from "@/components/VehicleModel/ContextProvider";
import api from "@/lib/axios";
import { VehicleModel } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchVehicleModels(context?: VehicleModelContextType) {
    const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
    const [loadingVehicleModels, setLoadingVehicleModels] = useState(false);

    const fetchVehicleModels = async () => {
        const response = await api.get('/api/service/vehicle/model');

        if (context) {
            context.setVehicleModels(response.data);
        } else {
            setVehicleModels(response.data);
        }

        setLoadingVehicleModels(false);
    }

    useEffect(() => {
        fetchVehicleModels();
    }, []);

    return { vehicleModels, loadingVehicleModels, setVehicleModels };
}
