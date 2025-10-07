'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { NotificationProvider } from "./ContextProvider";
import NotificationPage from "./NotificationPage/NotificationPage";

const NotificationIndex = () => {
    return (
        <NotificationProvider>
            <NotificationPage/>
        </NotificationProvider>
    )
}

export default withUIDisplayControls(NotificationIndex);
