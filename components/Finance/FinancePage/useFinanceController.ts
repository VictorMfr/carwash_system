import { FinanceContextType } from "../ContextProvider";
import useFetchFinance from "@/hooks/fetch/useFetchFinance";

export default function useFinanceController(context?: FinanceContextType) {
    const { finance, loadingFinance } = useFetchFinance(context);

    return {
        finance,
        loadingFinance
    }
}
