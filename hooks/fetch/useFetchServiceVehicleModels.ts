import { VehicleModelContextType } from "@/components/ServiceVehicleModel/ContextProvider";
import api from "@/lib/axios";
import { VehicleModel } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchServiceVehicleModels(context?: VehicleModelContextType) {
    const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
    const [loadingVehicleModels, setLoadingVehicleModels] = useState(false);

    const fetchVehicleModels = async () => {
        const response = await api.get('/api/service/vehicle/model');

        if (context) {
            context.setModels(response.data);
        } else {
            setVehicleModels(response.data);
        }

        setLoadingVehicleModels(false);
    }

    useEffect(() => {
        fetchVehicleModels();
    }, []);

    return { models: vehicleModels, loadingModels: loadingVehicleModels, setModels: setVehicleModels };
}
