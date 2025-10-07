import { ClientContextType } from "../ContextProvider";
import useFetchClients from "@/hooks/fetch/useFetchClients";

export default function useClientController(context?: ClientContextType) {
    const { clients, loadingClients } = useFetchClients(context);

    return {
        clients,
        loadingClients
    }
}
