'use client';


import { AppBar, Typography, Toolbar, IconButton, Stack, Container, Box, Tooltip } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from "./SideBar/SideBar";
import { useDashboardContext } from "./ContextProvider";
import LogoutIcon from '@mui/icons-material/Logout';
import useDashboardLayoutController from "./useDashboardLayoutController";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const dashboardContext = useDashboardContext();
    const controller = useDashboardLayoutController(dashboardContext);

    return (
        <Stack flex={1}>
            <AppBar position="relative" sx={{ boxShadow: 'none' }}>
                <Toolbar sx={{ gap: 2, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {controller.showMobileMenu && <IconButton onClick={() => dashboardContext.setMobileOpen(true)}>
                            <MenuIcon sx={{ color: 'white' }} />
                        </IconButton>}
                        <Typography variant="h6">Dashboard</Typography>
                    </Box>
                    <Box>
                        <Tooltip title="Logout">
                            <IconButton onClick={controller.handleLogout}>
                                <LogoutIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
            <Stack flex={1} flexDirection={'row'}>
                <SideBar />
                <Container sx={{ paddingTop: 8, paddingBottom: 8, height: '90vh', overflowY: 'scroll' }}>
                    {children}
                </Container>
            </Stack>
        </Stack>
    )
}