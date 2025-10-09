// Role Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useRoleContext } from "@/components/Role/ContextProvider";
import useRoleController from "@/components/Role/RolePage/useRoleController";
import RoleActions from "@/components/Role/RoleActions/RoleActions";
import CustomToolBar from "@/components/Role/RoleToolBar/ToolBar";
import RoleModal from "@/components/Role/RoleModal/RoleModal";

export default function RolePage() {
    
    const roleContext = useRoleContext();
    const controller = useRoleController(roleContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <RoleActions
                    params={params}
                    context={roleContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Roles</Typography>
                <Typography variant="body1">
                    Manage your roles here.
                </Typography>
            </Stack>

            <DataGrid
                loading={roleContext.loadingRoles}
                rows={roleContext.roles}
                columns={columns}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={roleContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    roleContext.setRowSelected(newSelectionModel);
                }}
            />

            <RoleModal/>
        </Stack>
    )
}
