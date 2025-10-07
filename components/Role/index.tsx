'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { RoleProvider } from "./ContextProvider";
import RolePage from "./RolePage/RolePage";

const RoleIndex = () => {
    return (
        <RoleProvider>
            <RolePage/>
        </RoleProvider>
    )
}

export default withUIDisplayControls(RoleIndex);
