import { OperatorContextType } from "../ContextProvider";
import useFetchOperators from "@/hooks/fetch/useFetchOperators";

export default function useOperatorController(context?: OperatorContextType) {
    const { operators, loadingOperators } = useFetchOperators(context);

    return {
        operators,
        loadingOperators
    }
}
