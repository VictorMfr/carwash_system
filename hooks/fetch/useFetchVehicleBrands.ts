import { VehicleBrandContextType } from "@/components/VehicleBrand/ContextProvider";
import api from "@/lib/axios";
import { VehicleBrand } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchVehicleBrands(context?: VehicleBrandContextType) {
    const [vehicleBrands, setVehicleBrands] = useState<VehicleBrand[]>([]);
    const [loadingVehicleBrands, setLoadingVehicleBrands] = useState(false);

    const fetchVehicleBrands = async () => {
        const response = await api.get('/api/service/vehicle/brand');

        if (context) {
            context.setVehicleBrands(response.data);
        } else {
            setVehicleBrands(response.data);
        }

        setLoadingVehicleBrands(false);
    }

    useEffect(() => {
        fetchVehicleBrands();
    }, []);

    return { vehicleBrands, loadingVehicleBrands, setVehicleBrands };
}
