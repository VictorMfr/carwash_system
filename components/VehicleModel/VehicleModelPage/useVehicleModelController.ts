import { VehicleModelContextType } from "../ContextProvider";
import useFetchVehicleModels from "@/hooks/fetch/useFetchVehicleModels";

export default function useVehicleModelController(context?: VehicleModelContextType) {
    const { vehicleModels, loadingVehicleModels } = useFetchVehicleModels(context);

    return {
        vehicleModels,
        loadingVehicleModels
    }
}
