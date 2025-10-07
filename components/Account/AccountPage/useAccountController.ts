import { AccountContextType } from "../ContextProvider";
import useFetchAccounts from "@/hooks/fetch/useFetchAccounts";

export default function useAccountController(context?: AccountContextType) {
    const { accounts, loadingAccounts } = useFetchAccounts(context);

    return {
        accounts,
        loadingAccounts
    }
}
