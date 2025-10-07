import { TransactionContextType } from "../ContextProvider";
import useFetchTransactions from "@/hooks/fetch/useFetchTransactions";

export default function useTransactionController(context?: TransactionContextType) {
    const { transactions, loadingTransactions } = useFetchTransactions(context);

    return {
        transactions,
        loadingTransactions
    }
}
