"use client";
import { Box, Typography, Stack, Button, Grid, Card, CardContent, Avatar, Chip, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
    return (
        <Box sx={{ bgcolor: 'background.default' }}>
            {/* Hero */}
            <Box
                sx={{
                    position: 'relative',
                    color: 'primary.contrastText',
                    overflow: 'hidden'
                }}
            >
                {/* Imagen de fondo de autolavado */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 0
                    }}
                />
                {/* Gradiente overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: (theme) => {
                            // Convertir colores hex a rgba con opacidad
                            const hexToRgba = (hex: string, alpha: number) => {
                                const r = parseInt(hex.slice(1, 3), 16);
                                const g = parseInt(hex.slice(3, 5), 16);
                                const b = parseInt(hex.slice(5, 7), 16);
                                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                            };
                            const primary = hexToRgba(theme.palette.primary.main, 0.85);
                            const dark = hexToRgba(theme.palette.primary.dark, 0.85);
                            return `linear-gradient(135deg, ${primary} 0%, ${dark} 100%)`;
                        },
                        zIndex: 1
                    }}
                />
                {/* Patrón de puntos */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                        opacity: 0.35,
                        zIndex: 2
                    }}
                />
                <Box sx={{ position: 'relative', maxWidth: 1200, mx: 'auto', px: 2, py: { xs: 5, md: 7 }, zIndex: 3 }}>
                    <Stack spacing={2} alignItems="center" textAlign="center">
                        <Box sx={{ position: 'relative', width: { xs: 200, sm: 280, md: 350 }, height: { xs: 120, sm: 170, md: 210 }, mb: 1 }}>
                            <Avatar
                                variant="rounded"
                                src="/imgs/logo.jpg"
                                alt="LA MANO DE DIOS - Multi-servicio"
                                sx={{ width: { xs: 200, sm: 280, md: 350 }, height: { xs: 120, sm: 170, md: 210 } }}
                            />
                        </Box>
                        <Chip label="Software para Autolavados" color="default" sx={{ bgcolor: 'rgba(255,255,255,0.16)', color: 'primary.contrastText', border: '1px solid rgba(255,255,255,0.24)' }} />
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                            LA MANO DE DIOS
                        </Typography>
                        <Typography variant="h6" sx={{ maxWidth: 860, opacity: 0.9 }}>
                            Gestiona agenda, servicios, clientes, inventario y finanzas con una plataforma rápida y moderna.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Link href="/login">
                                <Button size="large" variant="contained" color="secondary">Probar ahora</Button>
                            </Link>
                            <Link href="/login">
                                <Button size="large" variant="outlined" sx={{ color: 'primary.contrastText', borderColor: 'primary.contrastText' }}>Ver demo</Button>
                            </Link>
                        </Stack>
                        
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid size={{xs: 12, sm: 4}}>
                                <Stack spacing={0.5} alignItems="center">
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>+30%</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Más turnos completados</Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{xs: 12, sm: 4}}>
                                <Stack spacing={0.5} alignItems="center">
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>-40%</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Menos tiempo administrativo</Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{xs: 12, sm: 4}}>
                                <Stack spacing={0.5} alignItems="center">
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>100%</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Control de inventario</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Box>

            {/* Feature grid */}
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: { xs: 4, md: 5 } }}>
                <Stack spacing={2}>
                    <Typography variant="h5" textAlign="center">Todo lo que necesitas en un solo lugar</Typography>
                    <Grid container spacing={2}>
                        {[
                            { icon: <EventAvailableIcon color="primary" />, title: 'Agenda inteligente', desc: 'Organiza turnos, tiempos y estados en tiempo real.' },
                            { icon: <PeopleAltIcon color="primary" />, title: 'Clientes y fidelización', desc: 'Historial, preferencias y comunicación efectiva.' },
                            { icon: <Inventory2Icon color="primary" />, title: 'Inventario y stock', desc: 'Control por lotes, costos y mínimos de reposición.' },
                            { icon: <ReceiptLongIcon color="primary" />, title: 'Caja y finanzas', desc: 'Ingresos/egresos, métodos de pago y reportes.' },
                            { icon: <TrendingUpIcon color="primary" />, title: 'Reportes y métricas', desc: 'Indicadores clave para decisiones rápidas.' },
                            { icon: <SecurityIcon color="primary" />, title: 'Roles y seguridad', desc: 'Permisos por usuario y auditoría básica.' },
                        ].map((f, idx) => (
                            <Grid size={{xs: 12, sm: 6, md: 4}} key={idx}>
                                <Card variant="outlined" sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mb: 1, width: 40, height: 40 }}>
                                            {f.icon}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ mb: 0.5, fontSize: '1rem' }}>{f.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Box>

            {/* Showcase */}
            <Box sx={{ bgcolor: 'background.paper' }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: { xs: 4, md: 5 } }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography variant="h5" sx={{ mb: 1 }}>Panel rápido y moderno</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Visualiza el estado del día, servicios activos, ventas y alertas de inventario. Diseñado para velocidad y claridad.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Link href="/login">
                                    <Button variant="contained" startIcon={<SpeedIcon />}>Comenzar ahora</Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outlined">Explorar</Button>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                                <Box sx={{ position: 'relative', width: '100%', height: { xs: 180, sm: 220, md: 260 } }}>
                                    <Avatar
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                        alt="Panel de control del sistema"
                                        variant="rounded"
                                        sx={{ width: '100%', height: '100%' }}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* FAQ */}
            <Box sx={{ maxWidth: 900, mx: 'auto', px: 2, py: { xs: 4, md: 5 } }}>
                <Stack spacing={1} sx={{ mb: 2 }} alignItems="center">
                    <Typography variant="h5">Preguntas frecuentes</Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        Respuestas rápidas a dudas comunes
                    </Typography>
                </Stack>
                <Stack spacing={0.5}>
                    {[
                        { q: '¿Necesito instalar algo?', a: 'No, es 100% web. Solo necesitas un navegador moderno como Chrome, Firefox, Safari o Edge.' },
                        { q: '¿Puedo exportar mis datos?', a: 'Sí, soportamos exportaciones a formatos comunes como CSV y Excel. Tus datos siempre están bajo tu control.' },
                        { q: '¿Cómo funciona la prueba?', a: 'Puedes usar la demo sin registro y luego crear una cuenta cuando estés listo. No requiere tarjeta de crédito.' },
                        { q: '¿Es seguro guardar mis datos?', a: 'Sí, utilizamos encriptación y respaldos automáticos. Tus datos están protegidos y respaldados regularmente.' },
                        { q: '¿Puedo usar el sistema desde mi celular?', a: 'Sí, la plataforma es completamente responsive y funciona perfectamente en tablets y smartphones.' },
                        { q: '¿Cuántos usuarios puedo tener?', a: 'Puedes agregar múltiples usuarios con diferentes roles y permisos según las necesidades de tu autolavado.' },
                        { q: '¿Qué pasa si tengo problemas técnicos?', a: 'Ofrecemos soporte por correo electrónico y documentación completa para resolver dudas comunes.' },
                        { q: '¿Puedo personalizar el sistema?', a: 'El sistema incluye configuraciones básicas para adaptarse a tu flujo de trabajo. Para personalizaciones avanzadas, contáctanos.' },
                    ].map((faq, idx) => (
                        <Accordion key={idx}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle2">{faq.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary">{faq.a}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Stack>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: 'grey.100' }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 2 }}>
                    <Stack spacing={0.5} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar sx={{ width: 24, height: 24 }}>L</Avatar>
                            <Typography variant="subtitle2">LA MANO DE DIOS</Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary" textAlign="center">
                            © {new Date().getFullYear()} LA MANO DE DIOS — Sistema de Gestión de Autolavado
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}