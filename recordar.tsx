// Service Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography, Chip, Grid } from "@mui/material";
import { useServiceContext } from "@/components/Service/ContextProvider";
import useServiceController from "@/components/Service/ServicePage/useServiceController";
import ServiceActions from "@/components/Service/ServiceActions/ServiceActions";
import CustomToolBar from "@/components/Service/ServiceToolBar/ToolBar";
import ServiceModal from "@/components/Service/ServiceModal/ServiceModal";
import ServiceStatisticsCard from "@/components/Service/StatisticsCard/ServiceStatisticsCard";
import PaymentsCard from "@/components/Service/PaymentsCard/PaymentsCard";

export default function ServicePage() {
    
    const servicesContext = useServiceContext();
    const controller = useServiceController(servicesContext);

    const columns: GridColDef[] = [
        { 
            field: 'date', 
            headerName: 'Fecha',
            width: 150,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
        },
        { 
            field: 'vehicleLicensePlate', 
            headerName: 'Vehicle',
            width: 200
        },
        { 
            field: 'client', 
            headerName: 'Cliente',
            width: 200
        },
        { 
            field: 'recipeName', 
            headerName: 'Receta',
            width: 200
        },
        {
            field: 'extras',
            headerName: 'Extras',
            width: 200
        },
        { 
            field: 'operators', 
            headerName: 'Operadores',
            width: 250,
            renderCell: (params) => (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {params.row.operators?.map((operator: any) => (
                        <Chip 
                            key={operator.id} 
                            label={`${operator.name} ${operator.lastname}`} 
                            size="small" 
                        />
                    )) || <Typography variant="body2">No hay operadores</Typography>}
                </Stack>
            )
        },
        {
            field: 'dol_charge',
            headerName: 'Cobro dólares',
            width: 200
        },
        {
            field: 'bol_charge',
            headerName: 'Cobro bolívares',
            width: 200
        },
        {
            field: 'dolar_rate',
            headerName: 'Tasa de cambio',
            width: 200
        },
        {
            field: 'status',
            headerName: 'Estado',
            width: 200
        },
        { 
            field: 'created_at', 
            headerName: 'Creado', 
            width: 150,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
        },
        { 
            field: 'updated_at', 
            headerName: 'Actualizado', 
            width: 150,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <ServiceActions
                    params={params}
                    context={servicesContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <ServiceStatisticsCard />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <PaymentsCard />
                </Grid>
            </Grid>

            <DataGrid
                loading={controller.loadingServices}
                rows={servicesContext.services}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={servicesContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    servicesContext.setRowSelected(newSelectionModel);
                }}
            />

            <ServiceModal/>
        </Stack>
    )
}