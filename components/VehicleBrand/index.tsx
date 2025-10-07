'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { VehicleBrandProvider } from "./ContextProvider";
import VehicleBrandPage from "./VehicleBrandPage/VehicleBrandPage";

const VehicleBrandIndex = () => {
    return (
        <VehicleBrandProvider>
            <VehicleBrandPage/>
        </VehicleBrandProvider>
    )
}

export default withUIDisplayControls(VehicleBrandIndex);
