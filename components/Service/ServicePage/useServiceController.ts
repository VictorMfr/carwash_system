import { ServiceContextType } from "../ContextProvider";
import useFetchServices from "@/hooks/fetch/useFetchServices";

export default function useServiceController(context?: ServiceContextType) {
    const { services, loadingServices } = useFetchServices(context);

    return {
        services,
        loadingServices
    }
}
