import { VehicleContextType } from "../ContextProvider";
import useFetchVehicles from "@/hooks/fetch/useFetchVehicles";

export default function useVehicleController(context?: VehicleContextType) {
    const { vehicles, loadingVehicles } = useFetchVehicles(context);

    return {
        vehicles,
        loadingVehicles
    }
}
