import { Tabs, Tab, Card, CardContent, Typography, Box, CircularProgress, Grid, useMediaQuery } from "@mui/material"
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart as BarChartComponent } from '@mui/x-charts/BarChart';
import { LineChart as LineChartComponent } from '@mui/x-charts/LineChart';
import useStatisticsCardController from "./useStatisticsCardController";

export default function StatisticsCard() {

    const controller = useStatisticsCardController();
    const graphWidth = useMediaQuery('(min-width: 600px)') ? 500 : 300;

    const renderProductsTab = () => (
        <Grid container spacing={2}>
            <Grid size={6}>
                <Typography variant="h6" gutterBottom>
                    Productos por Marca
                </Typography>
                <PieChart
                    series={[
                        {
                            data: controller.statistics.productsByBrand.length > 0
                                ? controller.statistics.productsByBrand
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
                    Estado de Productos
                </Typography>
                <PieChart
                    series={[
                        {
                            data: controller.statistics.productsByState.length > 0
                                ? controller.statistics.productsByState
                                : [{ id: 0, value: 0, label: 'Sin datos' }]

                        },
                    ]}
                    width={300}
                    height={250}
                />
            </Grid>
        </Grid>
    );

    const renderConsumptionTab = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Consumo de Productos
            </Typography>
            <BarChartComponent
                xAxis={[
                    {
                        id: 'barCategories',
                        data: controller.statistics.consumptionData.length > 0
                            ? controller.statistics.consumptionData
                            : [{ product: 'Sin datos', consumption: 0 }]
                        ,
                        scaleType: 'band',
                    },
                ]}
                series={controller.statistics.consumptionData}
                width={graphWidth}
                height={250}
            />
        </Box>
    );

    const renderCostsTab = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Costos por Adquisición (Últimos 6 meses)
            </Typography>
            <LineChartComponent
                xAxis={[
                    {
                        data: (controller.statistics.costData.length > 0
                            ? controller.statistics.costData
                            : [{ month: 'Sin datos', cost: 0 }]
                        ).map(item => item.month),
                        scaleType: 'point',
                    },
                ]}
                series={[
                    {
                        data: (controller.statistics.costData.length > 0
                            ? controller.statistics.costData
                            : [{ month: 'Sin datos', cost: 0 }]
                        ).map(item => item.cost),
                        label: 'Costo ($)',
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
                return renderProductsTab();
            case 1:
                return renderConsumptionTab();
            case 2:
                return renderCostsTab();
            default:
                return renderProductsTab();
        }
    };

    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <Tabs
                value={controller.tab}
                onChange={(event, newValue) => controller.setTab(newValue)}
            >
                <Tab label="Productos" />
                <Tab label="Consumo" />
                <Tab label="Costos" />
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