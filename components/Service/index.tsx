'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { ServiceProvider } from "./ContextProvider";
import ServicePage from "./ServicePage/ServicePage";

const ServiceIndex = () => {
    return (
        <ServiceProvider>
            <ServicePage />
        </ServiceProvider>
    )
}

export default withUIDisplayControls(ServiceIndex);