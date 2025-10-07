// Client Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useClientContext } from "@/components/Client/ContextProvider";
import useClientController from "@/components/Client/ClientPage/useClientController";
import ClientActions from "@/components/Client/ClientActions/ClientActions";
import CustomToolBar from "@/components/Client/ClientToolBar/ToolBar";
import ClientModal from "@/components/Client/ClientModal/ClientModal";

export default function ClientPage() {
    
    const clientContext = useClientContext();
    const controller = useClientController(clientContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'lastname', headerName: 'Last Name' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <ClientActions
                    params={params}
                    context={clientContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Clients</Typography>
                <Typography variant="body1">
                    Manage your clients here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingClients}
                rows={clientContext.clients}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={clientContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    clientContext.setRowSelected(newSelectionModel);
                }}
            />

            <ClientModal/>
        </Stack>
    )
}
