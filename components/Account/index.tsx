'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { AccountProvider } from "./ContextProvider";
import AccountPage from "./AccountPage/AccountPage";

const AccountIndex = () => {
    return (
        <AccountProvider>
            <AccountPage/>
        </AccountProvider>
    )
}

export default withUIDisplayControls(AccountIndex);
