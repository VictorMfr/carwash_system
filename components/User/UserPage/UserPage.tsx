// User Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useUserContext } from "@/components/User/ContextProvider";
import useUserController from "@/components/User/UserPage/useUserController";
import UserActions from "@/components/User/UserActions/UserActions";
import CustomToolBar from "@/components/User/UserToolBar/ToolBar";
import UserModal from "@/components/User/UserModal/UserModal";

export default function UserPage() {
    
    const usersContext = useUserContext();
    useUserController(usersContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'lastname', headerName: 'Last Name' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'address', headerName: 'Address' },
        { field: 'email', headerName: 'Email' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <UserActions
                    params={params}
                    context={usersContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Users</Typography>
                <Typography variant="body1">
                    Manage your users here.
                </Typography>
            </Stack>

            <DataGrid
                loading={usersContext.loadingUsers}
                rows={usersContext.users}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={usersContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    usersContext.setRowSelected(newSelectionModel);
                }}
            />

            <UserModal/>
        </Stack>
    )
}
