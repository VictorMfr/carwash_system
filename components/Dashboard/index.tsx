'use client';

import { DashboardProvider } from "./ContextProvider";
import DashboardLayout from "./DashboardLayout";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";

const DashboardIndex = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashboardProvider>
            <DashboardLayout children={children}/>
        </DashboardProvider>
    );
}

export default withUIDisplayControls(DashboardIndex);