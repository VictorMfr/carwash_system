'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { ClientProvider } from "./ContextProvider";
import ClientPage from "./ClientPage/ClientPage";

const ClientIndex = () => {
    return (
        <ClientProvider>
            <ClientPage/>
        </ClientProvider>
    )
}

export default withUIDisplayControls(ClientIndex);
