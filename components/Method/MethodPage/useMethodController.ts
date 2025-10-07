import { MethodContextType } from "../ContextProvider";
import useFetchMethods from "@/hooks/fetch/useFetchMethods";

export default function useMethodController(context?: MethodContextType) {
    const { methods, loadingMethods } = useFetchMethods(context);

    return {
        methods,
        loadingMethods
    }
}