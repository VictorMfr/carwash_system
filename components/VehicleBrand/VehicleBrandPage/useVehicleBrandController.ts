import { VehicleBrandContextType } from "../ContextProvider";
import useFetchVehicleBrands from "@/hooks/fetch/useFetchVehicleBrands";

export default function useVehicleBrandController(context?: VehicleBrandContextType) {
    const { vehicleBrands, loadingVehicleBrands } = useFetchVehicleBrands(context);

    return {
        vehicleBrands,
        loadingVehicleBrands
    }
}
