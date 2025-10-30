'use client';

import { Grid } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import ModuleStats from "../ModuleStats/ModuleStats";
import { BarChart } from "@mui/icons-material";
import { ModuleStatsData } from "@/types/stats/stats";

const serviceModule: ModuleFormGridData = {
    url: '/api/service',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'name',
                headerName: 'Nombre',
                inputConfig: {
                    size: 12,
                    id: 'name'
                }
            }
        ]
    }
}

const serviceStats: ModuleStatsData = {
    url: '/api/service/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas de Servicios',
    description: 'Servicios por receta, vehículo, operador y evolución mensual.',
    icon: BarChart,
    tabs: [
        {
            label: 'Servicios',
            description: 'Series y distribuciones',
            useMenu: true,
            graphs: [
                {
                    id: 1,
                    label: 'Servicios por receta',
                    type: 'pie',
                    expectsFillArray: 'servicesByRecipe'
                },
                {
                    id: 2,
                    label: 'Servicios por vehículo',
                    type: 'pie',
                    expectsFillArray: 'servicesByVehicle'
                },
                {
                    id: 3,
                    label: 'Servicios por operador',
                    type: 'pie',
                    expectsFillArray: 'servicesByOperator'
                },
                {
                    id: 4,
                    label: 'Servicios por mes',
                    type: 'line',
                    expectsFillArray: 'servicesByMonth',
                    axis: { x: 'month', y: 'count' }
                }
            ]
        }
    ]
}

const drawers: ModuleFormGridData = {
    url: '/api/service/drawer',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'name',
                headerName: 'Nombre',
                inputConfig: {
                    size: 12,
                    id: 'name'
                }
            }
        ]
    }
}

export default function ServicePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <ModuleStats moduleStats={serviceStats} />
            </Grid>
            <Grid size={6}>
                <ModuleDataGrid moduleSettings={drawers} />
            </Grid>
            <Grid size={12}>
                <ModuleDataGrid moduleSettings={serviceModule} />
            </Grid>
        </Grid>
    )
}