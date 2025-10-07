// Finance Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Stack } from "@mui/material";
import { useFinanceContext } from "@/components/Finance/ContextProvider";
import useFinanceController from "@/components/Finance/FinancePage/useFinanceController";
import FinanceActions from "@/components/Finance/FinanceActions/FinanceActions";
import CustomToolBar from "@/components/Finance/FinanceToolBar/ToolBar";
import FinanceModal from "@/components/Finance/FinanceModal/FinanceModal";
import StatisticsCard from "../StatisticsCard/StatisticsCard";
import DollarRateCard from "../DollarRateCard/DollarRateCard";
import TotalsCard from "../TotalsCard/TotalsCard";
import AccountsCard from "../AccountsCard/AccountsCard";

export default function FinancePage() {

    const financeContext = useFinanceContext();
    const controller = useFinanceController(financeContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'dolar_rate', headerName: 'Dolar Rate' },
        { field: 'amount', headerName: 'Amount' },
        { field: 'date', headerName: 'Date' },
        { field: 'description', headerName: 'Description' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <FinanceActions
                    params={params}
                    context={financeContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <StatisticsCard />
                </Grid>
                <Grid container size={{ xs: 12, md: 5 }}>
                    <AccountsCard />
                </Grid>
                <Grid container size={12}>
                    <DollarRateCard />
                    <TotalsCard />
                </Grid>
            </Grid>

            <DataGrid
                loading={controller.loadingFinance}
                rows={financeContext.finance}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={financeContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    financeContext.setRowSelected(newSelectionModel);
                }}
            />

            <FinanceModal />
        </Stack>
    )
}