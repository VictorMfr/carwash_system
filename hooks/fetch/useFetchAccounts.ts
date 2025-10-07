import { AccountContextType } from "@/components/Account/ContextProvider";
import api from "@/lib/axios";
import { Account } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchAccounts(context?: AccountContextType) {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loadingAccounts, setLoadingAccounts] = useState(false);

    const fetchAccounts = async () => {
        const response = await api.get('/api/finance/account');

        if (context) {
            context.setAccounts(response.data);
        } else {
            setAccounts(response.data);
        }

        setLoadingAccounts(false);
    }

    useEffect(() => {
        fetchAccounts();
    }, []);

    return { accounts, loadingAccounts, setAccounts };
}
