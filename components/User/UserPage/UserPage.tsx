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
        { field: 'name', headerName: 'Nombre' },
        { field: 'lastname', headerName: 'Apellido' },
        { field: 'phone', headerName: 'Teléfono' },
        { field: 'address', headerName: 'Dirección' },
        { field: 'email', headerName: 'Correo' },
        { field: 'created_at', headerName: 'Creación' },
        { field: 'updated_at', headerName: 'Actualización' },
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
                <Typography variant="h4">Usuarios</Typography>
                <Typography variant="body1">
                    Administra los usuarios que podrán acceder al sistema.
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
