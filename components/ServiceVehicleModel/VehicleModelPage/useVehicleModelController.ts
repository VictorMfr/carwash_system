import { VehicleModelContextType } from "@/components/ServiceVehicleModel/ContextProvider";
import useFetchServiceVehicleModels from "@/hooks/fetch/useFetchServiceVehicleModels";

export default function useVehicleModelController(context?: VehicleModelContextType) {
    const { models, loadingModels } = useFetchServiceVehicleModels(context);

    return {
        models,
        loadingModels
    }
}
