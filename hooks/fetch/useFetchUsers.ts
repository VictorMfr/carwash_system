import { UserContextType } from "@/components/User/ContextProvider";
import api from "@/lib/axios";
import { User } from "@/services/backend/models/associations";
import { useEffect, useState } from "react";

export default function useFetchUsers(context?: UserContextType) {
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const fetchUsers = async () => {
        const response = await api.get('/api/user');

        if (context) {
            context.setUsers(response.data);
        } else {
            setUsers(response.data);
        }

        setLoadingUsers(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loadingUsers, setUsers };
}