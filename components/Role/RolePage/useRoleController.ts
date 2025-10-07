import { RoleContextType } from "../ContextProvider";
import useFetchRoles from "@/hooks/fetch/useFetchRoles";

export default function useRoleController(context?: RoleContextType) {
    const { roles, loadingRoles } = useFetchRoles(context);

    return {
        roles,
        loadingRoles
    }
}
