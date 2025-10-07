import { TypeContextType } from "../ContextProvider";
import useFetchTypes from "@/hooks/fetch/useFetchTypes";

export default function useTypeController(context?: TypeContextType) {
    const { types, loadingTypes } = useFetchTypes(context);

    return {
        types,
        loadingTypes
    }
}
