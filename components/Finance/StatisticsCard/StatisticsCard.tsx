import { Tabs, Tab, Card, CardContent, Typography, Box, Grid, CircularProgress, useMediaQuery } from "@mui/material";
import { LineChart as LineChartComponent } from '@mui/x-charts/LineChart';
import useStatisticsCardController from "./useStatisticsCardController";

export default function StatisticsCard() {

    const controller = useStatisticsCardController();
    const graphWidth = useMediaQuery('(min-width: 600px)') ? 500 : 300;

    const renderIncomesTab = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Ingresos en el tiempo
            </Typography>
            <LineChartComponent
                xAxis={[{ data: controller.statistics.months, scaleType: 'point' }]}
                series={[{ data: controller.statistics.incomes, label: 'Ingresos', curve: 'linear' }]}
                width={graphWidth}
                height={250}
            />
        </Box>
    );

    const renderCostsTab = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Costos en el tiempo
            </Typography>
            <LineChartComponent
                xAxis={[{ data: controller.statistics.months, scaleType: 'point' }]}
                series={[{ data: controller.statistics.costs, label: 'Costos', curve: 'linear' }]}
                width={graphWidth}
                height={250}
            />
        </Box>
    );

    const renderDollarTab = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Dólar en el tiempo
            </Typography>
            <LineChartComponent
                xAxis={[{ data: controller.statistics.months, scaleType: 'point' }]}
                series={[{ data: controller.statistics.dollar, label: 'Dólar (avg)', curve: 'linear' }]}
                width={graphWidth}
                height={250}
            />
        </Box>
    );

    const renderTabContent = () => {
        switch (controller.tab) {
            case 0:
                return renderIncomesTab();
            case 1:
                return renderCostsTab();
            case 2:
                return renderDollarTab();
            default:
                return renderIncomesTab();
        }
    };

    return (
        <Card>
            <Tabs
                value={controller.tab}
                onChange={(event, newValue) => controller.setTab(newValue)}
            >
                <Tab label="Ingresos" />
                <Tab label="Costos" />
                <Tab label="Dólar" />
            </Tabs>

            <CardContent sx={{ height: 330 }}>
                {controller.loading ? (
                    <Box sx={{ height: '100%'}} display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    renderTabContent()
                )}
            </CardContent>
        </Card>
    );
}