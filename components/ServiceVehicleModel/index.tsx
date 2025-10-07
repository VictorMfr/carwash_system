'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { VehicleModelProvider } from "./ContextProvider";
import VehicleModelPage from "./VehicleModelPage/VehicleModelPage";

const VehicleModelIndex = () => {
    return (
        <VehicleModelProvider>
            <VehicleModelPage/>
        </VehicleModelProvider>
    )
}

export default withUIDisplayControls(VehicleModelIndex);
