import { Box, Typography, Stack, Button } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
    return (
        <Box sx={{ bgcolor: 'background.default' }}>
            {/* Hero */}
            <Box sx={{
                maxWidth: 1200,
                mx: 'auto',
                px: 2,
                py: { xs: 6, md: 10 }
            }}>
                <Stack spacing={3} alignItems="center" textAlign="center">
                    <Typography variant="h3" component="h1">
                        LA MANO DE DIOS
                    </Typography>
                    <Typography variant="h5">
                        Sistema de Gestión para Autolavado
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 800 }}>
                        Optimiza la operación de tu autolavado: agenda, caja, servicios, clientes, inventario y reportes en un solo lugar.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Link href="/login">
                            <Button variant="contained" color="primary">Iniciar sesión</Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outlined" color="primary">Ver demo</Button>
                        </Link>
                    </Stack>
                    <Box sx={{
                        width: '100%',
                        height: { xs: 180, sm: 260, md: 340 },
                        bgcolor: 'grey.300',
                        borderRadius: 2
                    }} />
                </Stack>
            </Box>

            {/* Features */}
            <Box sx={{
                maxWidth: 1200,
                mx: 'auto',
                px: 2,
                py: { xs: 6, md: 8 }
            }}>
                <Stack spacing={4}>
                    <Typography variant="h5" textAlign="center">Todo lo que necesitas para tu autolavado</Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            <Box sx={{ height: 140, bgcolor: 'grey.300', borderRadius: 2 }} />
                            <Typography variant="h6">Agenda y servicios</Typography>
                            <Typography color="text.secondary">Gestiona turnos, servicios y tiempos de atención de forma eficiente.</Typography>
                        </Stack>
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            <Box sx={{ height: 140, bgcolor: 'grey.300', borderRadius: 2 }} />
                            <Typography variant="h6">Clientes y fidelización</Typography>
                            <Typography color="text.secondary">Historial de servicios, contactos y beneficios para tus clientes.</Typography>
                        </Stack>
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            <Box sx={{ height: 140, bgcolor: 'grey.300', borderRadius: 2 }} />
                            <Typography variant="h6">Caja y reportes</Typography>
                            <Typography color="text.secondary">Control de ingresos/egresos y reportes claros para tus decisiones.</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            {/* Showcase */}
            <Box sx={{ bgcolor: 'background.paper' }}>
                <Box sx={{
                    maxWidth: 1200,
                    mx: 'auto',
                    px: 2,
                    py: { xs: 6, md: 8 }
                }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h5" sx={{ mb: 1 }}>Panel intuitivo</Typography>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>
                                Visualiza métricas clave y navega entre módulos con una interfaz moderna y rápida.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Link href="/login">
                                    <Button variant="contained">Comenzar ahora</Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outlined">Explorar</Button>
                                </Link>
                            </Stack>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ height: 260, bgcolor: 'grey.300', borderRadius: 2 }} />
                        </Box>
                    </Stack>
                </Box>
            </Box>

            {/* Charts */}
            <Box sx={{
                maxWidth: 1200,
                mx: 'auto',
                px: 2,
                py: { xs: 6, md: 8 }
            }}>
                <Stack spacing={4}>
                    <Typography variant="h5" textAlign="center">Indicadores y gráficos</Typography>
                    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            <Box sx={{ height: 220, bgcolor: 'grey.300', borderRadius: 2 }} />
                            <Typography color="text.secondary" textAlign="center">Ingresos últimos 12 meses</Typography>
                        </Stack>
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            <Box sx={{ height: 220, bgcolor: 'grey.300', borderRadius: 2 }} />
                            <Typography color="text.secondary" textAlign="center">Servicios por tipo</Typography>
                        </Stack>
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            <Box sx={{ height: 220, bgcolor: 'grey.300', borderRadius: 2 }} />
                            <Typography color="text.secondary" textAlign="center">Clientes recurrentes</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                        <Box sx={{ flex: 1, height: 100, bgcolor: 'grey.200', borderRadius: 2 }} />
                        <Box sx={{ flex: 1, height: 100, bgcolor: 'grey.200', borderRadius: 2 }} />
                        <Box sx={{ flex: 1, height: 100, bgcolor: 'grey.200', borderRadius: 2 }} />
                        <Box sx={{ flex: 1, height: 100, bgcolor: 'grey.200', borderRadius: 2 }} />
                    </Stack>
                </Stack>
            </Box>

            {/* CTA */}
            <Box sx={{
                maxWidth: 1200,
                mx: 'auto',
                px: 2,
                py: { xs: 6, md: 10 }
            }}>

            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: 'grey.100' }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 3 }}>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        © {new Date().getFullYear()} LA MANO DE DIOS — Sistema de Gestión de Autolavado
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}