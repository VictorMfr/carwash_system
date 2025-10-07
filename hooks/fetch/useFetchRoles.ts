import { RoleContextType } from "@/components/Role/ContextProvider";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function useFetchRoles(context?: RoleContextType) {
    const [roles, setRoles] = useState<any[]>([]);
    const [loadingRoles, setLoadingRoles] = useState(true);

    const fetchRoles = async () => {
        try {
            setLoadingRoles(true);
            const response = await api.get('/api/role');

            if (context) {
                context.setRoles(response.data);
                context.setLoadingRoles(false);
            } else {
                setRoles(response.data);
                setLoadingRoles(false);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
            setLoadingRoles(false);
            if (context) {
                context.setLoadingRoles(false);
            }
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    return { roles, loadingRoles, setRoles };
}