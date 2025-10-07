// Transaction Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography, Chip } from "@mui/material";
import { useTransactionContext } from "@/components/Transaction/ContextProvider";
import useTransactionController from "@/components/Transaction/TransactionPage/useTransactionController";
import TransactionActions from "@/components/Transaction/TransactionActions/TransactionActions";
import CustomToolBar from "@/components/Transaction/TransactionToolBar/ToolBar";
import TransactionModal from "@/components/Transaction/TransactionModal/TransactionModal";

export default function TransactionPage() {
    
    const transactionContext = useTransactionContext();
    const controller = useTransactionController(transactionContext);

    const columns: GridColDef[] = [
        { 
            field: 'type', 
            headerName: 'Type',
            width: 120,
            renderCell: (params) => (
                <Chip 
                    label={params.value} 
                    color={params.value === 'income' ? 'success' : 'error'}
                    size="small"
                />
            )
        },
        { 
            field: 'amount', 
            headerName: 'Amount',
            width: 120,
            valueFormatter: (params: any) => `$${params.value.toFixed(2)}`
        },
        { field: 'description', headerName: 'Description', width: 200 },
        { 
            field: 'date', 
            headerName: 'Date',
            width: 150,
            valueFormatter: (params: any) => new Date(params.value).toLocaleDateString()
        },
        { field: 'created_at', headerName: 'Created At', width: 150 },
        { field: 'updated_at', headerName: 'Updated At', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <TransactionActions
                    params={params}
                    context={transactionContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Transactions</Typography>
                <Typography variant="body1">
                    Manage your transactions here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingTransactions}
                rows={transactionContext.transactions}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={transactionContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    transactionContext.setRowSelected(newSelectionModel);
                }}
            />

            <TransactionModal/>
        </Stack>
    )
}
