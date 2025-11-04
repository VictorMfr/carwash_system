"use client";

import { CardContent, Card, Grid, Typography, CardHeader, Stack, CardActionArea, Link, LinearProgress, Skeleton, List, ListItem, ListItemText, Divider, ListItemIcon } from "@mui/material";
import BoltIcon from '@mui/icons-material/Bolt';
import BuildIcon from '@mui/icons-material/Build';
import { ProductionQuantityLimits, AttachMoney, BarChart, AccessTime, Assessment, Inventory2, People, Paid, Notifications } from "@mui/icons-material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DashboardPageController from "./DashboardPageController";

export default function DashboardPage() {

    const controller = DashboardPageController();
    const [dollarRates, setDollarRates] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<{ id: string, title: string, subtitle?: string }[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('https://ve.dolarapi.com/v1/dolares');
                if (res.ok) {
                    const data = await res.json();
                    setDollarRates(Array.isArray(data) ? data : []);
                }

                const [svcRes, trxRes] = await Promise.all([
                    fetch('/api/service'),
                    fetch('/api/finance')
                ]);
                const items: { id: string, title: string, subtitle?: string }[] = [];
                if (svcRes.ok) {
                    const services = await svcRes.json();
                    (services || []).slice(0, 3).forEach((s: any) => {
                        items.push({
                            id: `svc-${s.id}`,
                            title: `Servicio ${s.recipeName ?? ''} - ${s.status ?? ''}`.trim(),
                            subtitle: `${dayjs(s.date).format('DD/MM/YYYY')} • ${s.client ?? ''}`.trim()
                        });
                    });
                }
                if (trxRes.ok) {
                    const txs = await trxRes.json();
                    (txs || []).slice(0, 3).forEach((t: any) => {
                        const isIncome = Number(t.amount) >= 0;
                        items.push({
                            id: `tx-${t.id}`,
                            title: `${isIncome ? 'Ingreso' : 'Costo'} Bs. ${Math.abs(Number(t.amount)).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                            subtitle: `${dayjs(t.date).format('DD/MM/YYYY')} • ${t.account ?? ''}`.trim()
                        });
                    });
                }
                setNotifications(items);
            } catch (e) {
                // ignore
            }
        };
        load();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid container spacing={2} size={{ xs: 12, md: 8 }}>
                {/* Bienvenida */}
                <Grid size={12}>
                    <Stack direction="row" alignItems="center">
                        <Typography variant="body1">Bienvenido al dashboard</Typography>
                    </Stack>
                </Grid>

                {controller.dbMeta && (
                    <Grid size={12}>
                        <Typography variant="body1">Almacenamiento disponible</Typography>
                        <LinearProgress
                            variant="determinate"
                            value={(controller.dbMeta[0].tamaño_mb / 500) * 100}
                        />
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <Typography variant="body2">{controller.dbMeta[0].tamaño_mb} MB</Typography>
                            <Typography variant="body2">500 MB</Typography>
                        </Stack>
                    </Grid>
                ) || (
                        <Grid size={12}>
                            <Skeleton variant="rectangular" height={48.2} width={'100%'} />
                        </Grid>
                    )}


                {/* Acciones rapidas */}
                <Grid size={12}>
                    <Stack direction="row" alignItems="center">
                        <BoltIcon color="warning" />
                        <Typography variant="body1">Acciones rapidas</Typography>
                    </Stack>
                </Grid>
                {/* Nuevo servicio */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/dashboard/service/form">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <BuildIcon color="primary" />
                                    </Stack>
                                    <Typography variant="body1">Nuevo servicio</Typography>
                                    <Typography variant="body2">Crea un nuevo servicio y gestiona la información fácilmente.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                {/* Nuevo producto */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/dashboard/stock/form">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <ProductionQuantityLimits color="info" />
                                    </Stack>
                                    <Typography variant="body1">Nuevo producto</Typography>
                                    <Typography variant="body2">Crea un nuevo producto y gestiona la información fácilmente.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                {/* Nueva transaccion */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/dashboard/transaction/form">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <AttachMoney color="success" />
                                    </Stack>
                                    <Typography variant="body1">Nueva transaccion</Typography>
                                    <Typography variant="body2">Crea una nueva transaccion y gestiona la información fácilmente.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* Atajos a reportes */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/reports/all">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <Assessment color="primary" />
                                    </Stack>
                                    <Typography variant="body1">Reporte global</Typography>
                                    <Typography variant="body2">Ver todos los reportes consolidados.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* Reportes */}
                <Grid size={12}>
                    <Stack direction="row" alignItems="center">
                        <BarChart color="primary" />
                        <Typography variant="body1">Reportes</Typography>
                    </Stack>
                </Grid>

                {/* Reporte de servicios */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/reports/service">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <BuildIcon color="warning" />
                                    </Stack>
                                    <Typography variant="body1">Reporte de servicios</Typography>
                                    <Typography variant="body2">Ver reportes de los servicios de la empresa.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* Reporte de inventario */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/reports/stock">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <Inventory2 color="info" />
                                    </Stack>
                                    <Typography variant="body1">Reporte de inventario</Typography>
                                    <Typography variant="body2">Ver reportes del inventario de la empresa.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* Reporte de finanzas */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/reports/finance">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <AttachMoney color="success" />
                                    </Stack>
                                    <Typography variant="body1">Reporte de finanzas</Typography>
                                    <Typography variant="body2">Ver reportes de las finanzas de la empresa.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* Reporte de clientes */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/reports/client">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <People color="secondary" />
                                    </Stack>
                                    <Typography variant="body1">Reporte de clientes</Typography>
                                    <Typography variant="body2">Ver reportes de clientes y su actividad.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* Reporte global */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined">
                        <CardActionArea component={Link} href="/reports/all">
                            <CardContent>
                                <Stack>
                                    <Stack direction="row" justifyContent="end" alignItems="center">
                                        <Assessment color="primary" />
                                    </Stack>
                                    <Typography variant="body1">Reporte global</Typography>
                                    <Typography variant="body2">Ver todos los reportes consolidados.</Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

            {/* Informacion de la empresa */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card variant="outlined">
                    <CardHeader title="Información de la empresa" subheader={dayjs().format('DD/MM/YYYY')} />
                    <CardContent>
                        <Stack spacing={2}>
                            <Stack>
                                <Typography variant="body2" color="text.secondary">Tasas del dólar</Typography>
                                <List dense disablePadding>
                                    {dollarRates.length > 0 ? (
                                        dollarRates.map((r: any) => (
                                            <ListItem key={r.nombre} disableGutters>
                                                <ListItemIcon sx={{ minWidth: 36 }}>
                                                    <Paid color="success" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`${r.nombre}`}
                                                    secondary={`Bs. ${Number(r.promedio ?? r.precio ?? 0).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                                />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <ListItem disableGutters>
                                            <ListItemText primary="No se pudieron cargar las tasas." />
                                        </ListItem>
                                    )}
                                </List>
                            </Stack>

                            <Divider />

                            <Stack>
                                <Typography variant="body2" color="text.secondary">Últimas notificaciones</Typography>
                                <List dense disablePadding>
                                    {notifications.length > 0 ? (
                                        notifications.map(n => (
                                            <ListItem key={n.id} disableGutters>
                                                <ListItemIcon sx={{ minWidth: 36 }}>
                                                    <Notifications color="primary" />
                                                </ListItemIcon>
                                                <ListItemText primary={n.title} secondary={n.subtitle} />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <ListItem disableGutters>
                                            <ListItemText primary="Sin notificaciones recientes." />
                                        </ListItem>
                                    )}
                                </List>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}