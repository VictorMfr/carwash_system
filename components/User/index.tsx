'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { UserProvider } from "./ContextProvider";
import UserPage from "./UserPage/UserPage";

const UserIndex = () => {
    return (
        <UserProvider>
            <UserPage/>
        </UserProvider>
    )
}

export default withUIDisplayControls(UserIndex);