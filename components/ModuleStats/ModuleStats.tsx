import { ModuleStatsData } from "@/types/stats/stats";
import { Card, CardContent, CircularProgress, Skeleton, Grid, Tab, Tabs, Typography, Button, Menu, MenuItem, Stack } from "@mui/material";
import { BarChart, ChartDataProvider, ChartsWrapper, LineChart, PieChart, ChartsSurface, ChartsTooltip, PiePlot, } from "@mui/x-charts";
import { Fragment, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/fetch/useFetch";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChartsNoDataOverlay } from "@mui/x-charts/ChartsOverlay";



const renderGraph = (graph: any, data: any, isSmall: boolean) => {
    if (graph.type === 'pie') {
        return (
            <PieChart
                series={[{ data: data[graph.expectsFillArray], type: 'pie' }]}
                width={300}
                height={250}
                slotProps={{
                    legend: {
                        direction: isSmall ? 'horizontal' : 'vertical',
                        position: { vertical: isSmall ? 'bottom' : 'top' },
                        sx: {
                            marginTop: isSmall ? 6 : 0,
                        }
                    }
                }}
                localeText={{
                    noData: 'No hay datos',
                }}
            />
        );
    } else if (graph.type === 'bar') {
        return (
            <BarChart
                key={graph.id}
                xAxis={[{ dataKey: graph.bar.xAxis }]}
                series={[{ dataKey: graph.bar.yAxis }]}
                dataset={graph.bar.dataset}
                width={300}
                height={348}
            />
        );
    } else if (graph.type === 'line') {
        return (
            <LineChart
                key={graph.id}
                dataset={data[graph.expectsFillArray] || []}
                xAxis={[{ dataKey: graph.axis?.x, scaleType: 'point' }]}
                series={[{ dataKey: graph.axis?.y, label: 'Costo ($)' }]}
                height={248}
            />
        );
        return <></>;
    }
}

export default function ModuleStats({ moduleStats }: { moduleStats: ModuleStatsData }) {
    const [tab, setTab] = useState(0);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedGraphId, setSelectedGraphId] = useState<number | null>(null);

    const { data, loading } = useFetch(moduleStats.url);

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    const currentTab = moduleStats.tabs[tab];

    useEffect(() => {
        // Reset selected graph when tab changes
        setSelectedGraphId(currentTab.graphs[0]?.id ?? null);
        setMenuAnchorEl(null);
    }, [tab]);

    const useMenu = Boolean(currentTab.useMenu) && (isSmall || moduleStats.size === 'small');
    const graphsToRender = useMemo(() => {
        if (useMenu && selectedGraphId != null) {
            return currentTab.graphs.filter((g) => g.id === selectedGraphId);
        }
        return currentTab.graphs;
    }, [useMenu, selectedGraphId, currentTab]);

    return (
        <Stack sx={{ height: '100%' }} spacing={2}>

            <Stack direction="row" alignItems="center" spacing={2}>
                {moduleStats.icon && <moduleStats.icon color="action" />}
                <Stack>
                    {moduleStats.label && <Typography variant="h5">{moduleStats.label}</Typography>}
                    {moduleStats.description && <Typography variant="body1">{moduleStats.description}</Typography>}
                </Stack>
            </Stack>
            <Card variant="outlined" sx={{ height: '100%' }}>
                <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
                    {moduleStats.tabs.map((tab) => (
                        <Tab key={tab.label} label={tab.label} />
                    ))}
                </Tabs>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Typography variant="body2" gutterBottom>{currentTab.description}</Typography>
                        </Grid>
                        {useMenu && (
                            <Grid size={12}>
                                <Button
                                    variant="outlined"
                                    onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                                >
                                    {currentTab.graphs.find(g => g.id === selectedGraphId)?.label ?? 'Seleccionar'}
                                </Button>
                                <Menu
                                    anchorEl={menuAnchorEl}
                                    open={Boolean(menuAnchorEl)}
                                    onClose={() => setMenuAnchorEl(null)}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                >
                                    {currentTab.graphs.map((g) => (
                                        <MenuItem
                                            key={g.id}
                                            selected={g.id === selectedGraphId}
                                            onClick={() => {
                                                setSelectedGraphId(g.id);
                                                setMenuAnchorEl(null);
                                            }}
                                        >
                                            {g.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>
                        )}
                        {graphsToRender.map(graph => (
                            <Fragment key={graph.id}>
                                {loading && moduleStats.loadingType === 'skeleton' ? <Skeleton variant="rounded" sx={{ width: { xs: '100%', md: '50%' }, height: '100%' }} /> : (
                                    <Grid key={graph.id} size={{ xs: 12, md: moduleStats.size === 'small' ? 12 : 6 }}>
                                        <Card variant="outlined" sx={{ height: 348 }}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>{graph.label}</Typography>
                                            </CardContent>
                                            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {loading ? (
                                                    moduleStats.loadingType === 'spinner' ? <CircularProgress /> : <Skeleton variant="rectangular" height="100%" width="100%" />
                                                ) : renderGraph(graph, data, isSmall)}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )}
                            </Fragment>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Stack >
    )
}