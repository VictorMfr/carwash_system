'use client';

import ModuleStats from "../ModuleStats/ModuleStats";
import { ModuleStatsData } from "@/types/stats/stats";
import { BarChart } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import { ModuleFormGridData, ColumnData } from "@/types/datagrid/datagrid";

const marketingStatsModule: ModuleStatsData = {
    url: '/api/marketing/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas de Clientes',
    description: 'Fidelidad, morosidad y frecuencia',
    icon: BarChart,
    tabs: [
        {
            label: 'Clientes',
            description: 'Top 10 por categoría',
            useMenu: true,
            graphs: [
                { id: 1, label: 'Clientes más fieles', type: 'pie', expectsFillArray: 'loyalClients' },
                { id: 2, label: 'Clientes más morosos', type: 'pie', expectsFillArray: 'delinquentClients' },
                { id: 3, label: 'Clientes más frecuentes', type: 'pie', expectsFillArray: 'frequentClients' },
            ],
        },
    ],
};

export default function MarketingPage() {
    const clientColumns: ColumnData[] = [
        { field: 'name', headerName: 'Nombre', width: 180, inputConfig: { size: 12, id: 'name' }, flex: 1 },
        { field: 'lastname', headerName: 'Apellido', width: 180, inputConfig: { size: 12, id: 'lastname' }, flex: 1 },
        { field: 'phone', headerName: 'Teléfono', width: 160, inputConfig: { size: 12, id: 'phone' }, flex: 1 },
    ];

    const clientsGridModule: ModuleFormGridData = {
        url: '/api/marketing/clients',
        label: 'Clientes',
        description: 'Búsqueda y consulta de clientes (solo lectura)',
        columns: {
            config: { gridSpacing: 2 },
            data: [
                ...clientColumns,
                { field: 'serviceCount', headerName: '# Servicios', width: 120, inputConfig: { size: 12, id: 'serviceCount' } },
                { field: 'totalSpent', headerName: 'Monto (Bs)', width: 140, inputConfig: { size: 12, id: 'totalSpent' }, renderCell: (p) => (Number(p.value || 0)).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'loyaltyIndex', headerName: 'Fidelidad', width: 120, inputConfig: { size: 12, id: 'loyaltyIndex' }, renderCell: (p) => (Number(p.value || 0)).toFixed(2) },
                { field: 'delinquencyIndex', headerName: 'Morosidad', width: 120, inputConfig: { size: 12, id: 'delinquencyIndex' }, renderCell: (p) => (Number(p.value || 0)).toFixed(2) },
                { field: 'promotionEligible', headerName: 'Promoción', type: 'boolean', width: 130, inputConfig: { size: 12, id: 'promotionEligible' }, renderCell: (p) => <Chip label={p.value ? 'Sí' : 'No'} color={p.value ? 'success' : 'default'} size="small" /> },
                { field: 'reminderEligible', headerName: 'Recordatorio', type: 'boolean', width: 140, inputConfig: { size: 12, id: 'reminderEligible' }, renderCell: (p) => <Chip label={p.value ? 'Sí' : 'No'} color={p.value ? 'warning' : 'default'} size="small" /> },
            ],
        },
        config: {
            inputConfig: { allowCheckboxSelection: false },
            toolbar: {
                show: ['quickFilter', 'filter']
            },
            append: {
                initialState: {
                    sorting: {
                        sortModel: [{ field: 'loyaltyIndex', sort: 'desc' }]
                    },
                    filter: {
                        filterModel: {
                            items: [
                                { field: 'promotionEligible', operator: 'is', value: 'true' }
                            ]
                        }
                    }
                }
            }
        },
    };

    return (
        <Stack spacing={2}>
            <ModuleStats moduleStats={marketingStatsModule} />
            <ModuleDataGrid moduleSettings={clientsGridModule} />
        </Stack>
    )
}