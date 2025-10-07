import { TransactionContextType } from "@/components/Transaction/ContextProvider";
import api from "@/lib/axios";
import { Transaction } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchTransactions(context?: TransactionContextType) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);

    const fetchTransactions = async () => {
        const response = await api.get('/api/finance/transaction');

        if (context) {
            context.setTransactions(response.data);
        } else {
            setTransactions(response.data);
        }

        setLoadingTransactions(false);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return { transactions, loadingTransactions, setTransactions };
}
