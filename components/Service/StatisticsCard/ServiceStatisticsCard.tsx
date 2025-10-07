import { Tabs, Tab, Card, CardContent, Typography, Box, CircularProgress, Grid, useMediaQuery } from "@mui/material"
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart as BarChartComponent } from '@mui/x-charts/BarChart';
import { LineChart as LineChartComponent } from '@mui/x-charts/LineChart';
import useServiceStatisticsCardController from "./useServiceStatisticsCardController";

export default function ServiceStatisticsCard() {

    const controller = useServiceStatisticsCardController();
    const graphWidth = useMediaQuery('(min-width: 600px)') ? 500 : 300;

    const renderServicesTab = () => (
        <Grid container spacing={2}>
            <Grid size={6}>
                <Typography variant="h6" gutterBottom>
                    Servicios por Receta
                </Typography>
                <PieChart
                    series={[
                        {
                            data: controller.statistics.servicesByRecipe.length > 0
                                ? controller.statistics.servicesByRecipe
                                : [{ id: 0, value: 0, label: 'Sin datos' }]
                            ,
                        },
                    ]}
                    width={300}
                    height={250}
                />
            </Grid>
            <Grid size={6}>
                <Typography variant="h6" gutterBottom>
                    Servicios por Vehículo
                </Typography>
                <PieChart
                    series={[
                        {
                            data: controller.statistics.servicesByVehicle.length > 0
                                ? controller.statistics.servicesByVehicle
                                : [{ id: 0, value: 0, label: 'Sin datos' }]

                        },
                    ]}
                    width={300}
                    height={250}
                />
            </Grid>
        </Grid>
    );

    const renderOperatorsTab = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Servicios por Operador
            </Typography>
            <BarChartComponent
                xAxis={[
                    {
                        id: 'barCategories',
                        data: controller.statistics.servicesByOperator.length > 0
                            ? controller.statistics.servicesByOperator
                            : [{ id: 0, value: 0, label: 'Sin datos' }]
                        ,
                        scaleType: 'band',
                    },
                ]}
                series={controller.statistics.servicesByOperator}
                width={graphWidth}
                height={250}
            />
        </Box>
    );

    const renderTrendsTab = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Tendencia de Servicios (Últimos 6 meses)
            </Typography>
            <LineChartComponent
                xAxis={[
                    {
                        data: (controller.statistics.servicesByMonth.length > 0
                            ? controller.statistics.servicesByMonth
                            : [{ month: 'Sin datos', count: 0 }]
                        ).map(item => item.month),
                        scaleType: 'point',
                    },
                ]}
                series={[
                    {
                        data: (controller.statistics.servicesByMonth.length > 0
                            ? controller.statistics.servicesByMonth
                            : [{ month: 'Sin datos', count: 0 }]
                        ).map(item => item.count),
                        label: 'Servicios',
                        curve: 'linear',
                    },
                ]}
                width={graphWidth}
                height={250}
            />
        </Box>
    );

    const renderTabContent = () => {
        switch (controller.tab) {
            case 0:
                return renderServicesTab();
            case 1:
                return renderOperatorsTab();
            case 2:
                return renderTrendsTab();
            default:
                return renderServicesTab();
        }
    };

    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <Tabs
                value={controller.tab}
                onChange={(event, newValue) => controller.setTab(newValue)}
            >
                <Tab label="Servicios" />
                <Tab label="Operadores" />
                <Tab label="Tendencias" />
            </Tabs>

            <CardContent sx={{ height: 330 }}>
                {controller.loading ? (
                    <Box sx={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    renderTabContent()
                )}
            </CardContent>
        </Card>
    )
}
