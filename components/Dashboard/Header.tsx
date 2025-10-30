"use client";
import { useState } from "react";
import type React from "react";
import { AppBar, Toolbar, Box, IconButton, Stack, Typography, Tooltip, Menu as MuiMenu, MenuItem } from "@mui/material";
import { Menu, Help, Person, Logout, MoreVert } from "@mui/icons-material";
import { useDashboardContext } from "./ContextProvider";
import useDashboardLayoutController from "./useDashboardLayoutController";
import Link from "next/link";

export default function Header({ controller, dashboardContext }: { controller: ReturnType<typeof useDashboardLayoutController>, dashboardContext: ReturnType<typeof useDashboardContext> }) {
    const [optionsAnchorEl, setOptionsAnchorEl] = useState<null | HTMLElement>(null);
    const isOptionsOpen = Boolean(optionsAnchorEl);

    const handleOpenOptions = (event: React.MouseEvent<HTMLElement>) => {
        setOptionsAnchorEl(event.currentTarget);
    };

    const handleCloseOptions = () => {
        setOptionsAnchorEl(null);
    };
    return (
        <AppBar position="relative" sx={{ boxShadow: 'none' }}>
            <Toolbar sx={{ gap: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {controller.showMobileMenu && <IconButton onClick={() => dashboardContext.setMobileOpen(true)}>
                        <Menu sx={{ color: 'white' }} />
                    </IconButton>}
                    <Stack direction="row" alignItems="center" gap={{ xs: 1, md: 2 }} sx={{ opacity: controller.showMobileMenu ? 0.8 : 1 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 50 36" fill="none">
                            <path d="M47.7812 10.5C48.5312 10.5 49.0938 11.25 48.9062 11.9062L48.3438 14.1562C48.25 14.7188 47.7812 15 47.3125 15H45.3438C46.6562 16.125 47.5 17.7188 47.5 19.5V24C47.5 25.5938 46.8438 26.9062 46 27.9375V33C46 34.6875 44.5938 36 43 36H40C38.3125 36 37 34.6875 37 33V30H13V33C13 34.6875 11.5938 36 10 36H7C5.3125 36 4 34.6875 4 33V27.9375C3.0625 26.9062 2.5 25.5938 2.5 24V19.5C2.5 17.7188 3.25 16.125 4.5625 15H2.6875C2.125 15 1.65625 14.7188 1.5625 14.1562L1 11.9062C0.8125 11.25 1.375 10.5 2.125 10.5H7.65625L9.25 6.65625C10.8438 2.625 14.6875 0 19 0H30.9062C35.2188 0 39.0625 2.625 40.6562 6.65625L42.25 10.5H47.7812ZM14.7812 8.90625L13 13.5H37L35.125 8.90625C34.375 7.125 32.7812 6 30.9062 6H19C17.125 6 15.5312 7.125 14.7812 8.90625ZM10 24C11.7812 24 14.5 24.2812 14.5 22.5C14.5 20.7188 11.7812 18 10 18C8.125 18 7 19.2188 7 21C7 22.875 8.125 24 10 24ZM40 24C41.7812 24 43 22.875 43 21C43 19.2188 41.7812 18 40 18C38.125 18 35.5 20.7188 35.5 22.5C35.5 24.2812 38.125 24 40 24Z" fill="white" />
                        </svg>
                        {!controller.showMobileMenu && <Stack sx={{ position: 'relative', top: 3, left: 0 }}>
                            <Typography variant="h6" fontWeight={600}>La Mano de Dios</Typography>
                            <Typography
                                variant="caption"
                                sx={{ position: 'relative', top: -7 }}
                            >
                                Sistema Administrativo
                            </Typography>
                        </Stack>}
                        {controller.showMobileMenu && (
                            <Typography variant="h6" fontWeight={600} fontStyle="italic">
                                LMD
                            </Typography>
                        )}
                    </Stack>

                </Box>
                <Box>
                    {!controller.showMobileMenu && (
                        <>
                            {/* Help */}
                            <Link href="/docs">
                                <Tooltip title="Help">
                                    <IconButton>
                                        <Help sx={{ color: 'white' }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>

                            {/* Profile */}
                            <Tooltip title="Profile">
                                <IconButton>
                                    <Person sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>

                            {/* Logout */}
                            <Tooltip title="Logout">
                                <IconButton onClick={controller.handleLogout}>
                                    <Logout sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                    {controller.showMobileMenu && (
                        <>
                            <Tooltip title="Opciones">
                                <IconButton onClick={handleOpenOptions}>
                                    <MoreVert sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>
                            <MuiMenu
                                anchorEl={optionsAnchorEl}
                                open={isOptionsOpen}
                                onClose={handleCloseOptions}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <MenuItem component={Link} href="/docs" onClick={handleCloseOptions}>
                                    Ayuda
                                </MenuItem>
                                <MenuItem onClick={handleCloseOptions}>
                                    Perfil
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleCloseOptions();
                                        controller.handleLogout();
                                    }}
                                >
                                    Cerrar sesión
                                </MenuItem>
                            </MuiMenu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}