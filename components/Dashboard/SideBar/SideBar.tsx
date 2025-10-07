'use client';

import { Drawer, SxProps, useMediaQuery } from "@mui/material";
import { useDashboardContext } from "../ContextProvider";
import NavBar from "./NavBar/NavBar";

const slotConfig: typeof Drawer['prototype']['slotProps'] = {
    root: {
        keepMounted: true
    }
}

export default function SideBar() {

    const dashboardContext = useDashboardContext();
    const variant = useMediaQuery('(max-width: 600px)') ? 'temporary' : 'permanent';

    const styleConfig: SxProps = {
        '& .MuiDrawer-paper': {
            position: 'relative',
            maxHeight: variant === 'temporary' ? '100vh' : '90vh',
            width: 240,
            // Custom scrollbar styles
            overflowY: 'auto',
            scrollbarColor: '#888 transparent',
            scrollbarWidth: 'thin',
        },
    }

    return (
        <Drawer
            variant={variant}
            open={dashboardContext.mobileOpen}
            sx={styleConfig}
            slotProps={slotConfig}
            onClose={() => dashboardContext.setMobileOpen(false)}
        >
            <NavBar />
        </Drawer>
    )
}