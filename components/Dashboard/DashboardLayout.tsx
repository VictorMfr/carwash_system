'use client';

import { Stack, Container } from "@mui/material";
import SideBar from "./SideBar/SideBar";
import { useDashboardContext } from "./ContextProvider";
import useDashboardLayoutController from "./useDashboardLayoutController";
import Header from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const dashboardContext = useDashboardContext();
    const controller = useDashboardLayoutController(dashboardContext);

    return (
        <Stack flex={1}>
            <Header controller={controller} dashboardContext={dashboardContext} />
            <Stack flex={1} flexDirection={'row'}>
                <SideBar />
                <Container sx={{ paddingTop: 8, paddingBottom: 8, height: '90vh', overflowY: 'scroll' }}>
                    {children}
                </Container>
            </Stack>
        </Stack>
    )
}