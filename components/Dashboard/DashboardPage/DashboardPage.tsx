"use client";

import { CardContent, Card, Grid, Typography, CardHeader, Stack, CardActionArea, Link, LinearProgress, Skeleton } from "@mui/material";
import BoltIcon from '@mui/icons-material/Bolt';
import BuildIcon from '@mui/icons-material/Build';
import { ProductionQuantityLimits, AttachMoney, BarChart, AccessTime } from "@mui/icons-material";
import DashboardPageController from "./DashboardPageController";

export default function DashboardPage() {

    const controller = DashboardPageController();

    return (
        <Grid container spacing={2}>

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
                    <BoltIcon />
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
                                    <BuildIcon />
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
                                    <ProductionQuantityLimits />
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
                                    <AttachMoney />
                                </Stack>
                                <Typography variant="body1">Nueva transaccion</Typography>
                                <Typography variant="body2">Crea una nueva transaccion y gestiona la información fácilmente.</Typography>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            {/* Ver reportes */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card variant="outlined">
                    <CardActionArea component={Link} href="/dashboard/reports">
                        <CardContent>
                            <Stack>
                                <Stack direction="row" justifyContent="end" alignItems="center">
                                    <BarChart />
                                </Stack>
                                <Typography variant="body1">Ver reportes</Typography>
                                <Typography variant="body2">Ver los reportes de la empresa.</Typography>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            
        </Grid>
    );
}