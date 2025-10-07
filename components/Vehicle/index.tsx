'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { VehicleProvider } from "./ContextProvider";
import VehiclePage from "./VehiclePage/VehiclePage";

const VehicleIndex = () => {
    return (
        <VehicleProvider>
            <VehiclePage/>
        </VehicleProvider>
    )
}

export default withUIDisplayControls(VehicleIndex);
