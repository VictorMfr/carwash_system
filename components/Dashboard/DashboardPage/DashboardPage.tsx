import { CardContent, Card, Grid, Typography, CardHeader, Stack, CardActionArea, Link } from "@mui/material";
import BoltIcon from '@mui/icons-material/Bolt';
import BuildIcon from '@mui/icons-material/Build';
import { ProductionQuantityLimits, AttachMoney, BarChart, AccessTime } from "@mui/icons-material";

export default function DashboardPage() {
    return (
        <Grid container spacing={2}>

            {/* Bienvenida */}
            <Grid size={12}>
                <Stack direction="row" alignItems="center">
                    <Typography variant="body1">Bienvenido al dashboard</Typography>
                </Stack>
            </Grid>


            {/* Acciones rapidas */}
            <Grid size={12}>
                <Stack direction="row" alignItems="center">
                    <BoltIcon />
                    <Typography variant="body1">Acciones rapidas</Typography>
                </Stack>
            </Grid>
            {/* Nuevo servicio */}
            <Grid size={4}>
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
            <Grid size={4}>
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
            <Grid size={4}>
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
            <Grid size={4}>
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