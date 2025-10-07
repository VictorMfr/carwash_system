import { StateContextType } from "../ContextProvider";
import useFetchStates from "@/hooks/fetch/useFetchStates";

export default function useStateController(context?: StateContextType) {
    const { states, loadingStates } = useFetchStates(context);

    return {
        states,
        loadingStates
    }
}
