// Stock Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useStockContext } from "@/components/Stock/ContextProvider";
import useStockController from "@/components/Stock/StockPage/useStockController";
import StockActions from "@/components/Stock/StockActions/StockActions";
import CustomToolBar from "@/components/Stock/StockToolBar/ToolBar";
import StockModal from "@/components/Stock/StockModal/StockModal";
import StatisticsCard from "@/components/Stock/StatisticsCard/StatisticsCard";
import MaintenanceCard from "@/components/Stock/MaintenanceCard/MaintenanceCard";


export default function StockPage() {

    const stockContext = useStockContext();
    const controller = useStockController(stockContext);
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'unit', headerName: 'Unit' },
        {
            field: 'total_quantity',
            headerName: 'Total Qty',
            renderCell: (params) => (
                <Box height="100%" sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <Typography
                        color={params.row.total_quantity < params.row.minimum_quantity ? 'error' : 'inherit'}
                    >
                        {params.row.total_quantity}
                    </Typography>
                </Box>
            )
        },
        { field: 'minimum_quantity', headerName: 'Min Qty' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => (
                <StockActions params={params} context={stockContext} />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <StatisticsCard />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <MaintenanceCard />
                </Grid>
            </Grid>

            <DataGrid
                loading={controller.loadingStocks}
                rows={stockContext.stocks}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={stockContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    stockContext.setRowSelected(newSelectionModel);
                }}
            />
            <StockModal />
        </Stack>
    )
}
