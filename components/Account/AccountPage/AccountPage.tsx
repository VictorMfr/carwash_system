// Account Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useAccountContext } from "@/components/Account/ContextProvider";
import useAccountController from "@/components/Account/AccountPage/useAccountController";
import AccountActions from "@/components/Account/AccountActions/AccountActions";
import CustomToolBar from "@/components/Account/AccountToolBar/ToolBar";
import AccountModal from "@/components/Account/AccountModal/AccountModal";

export default function AccountPage() {
    
    const accountContext = useAccountContext();
    const controller = useAccountController(accountContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'description', headerName: 'Description' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <AccountActions
                    params={params}
                    context={accountContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Accounts</Typography>
                <Typography variant="body1">
                    Manage your finance accounts here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingAccounts}
                rows={accountContext.accounts}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={accountContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    accountContext.setRowSelected(newSelectionModel);
                }}
            />

            <AccountModal/>
        </Stack>
    )
}
