import { UserContextType } from "../ContextProvider";
import useFetchUsers from "@/hooks/fetch/useFetchUsers";

export default function useUserController(context?: UserContextType) {
    const { users, loadingUsers } = useFetchUsers(context);

    return {
        users,
        loadingUsers
    }
}
