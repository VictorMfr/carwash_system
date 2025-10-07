// Notification Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useNotificationContext } from "@/components/Notification/ContextProvider";
import useNotificationController from "@/components/Notification/NotificationPage/useNotificationController";
import NotificationActions from "@/components/Notification/NotificationActions/NotificationActions";
import CustomToolBar from "@/components/Notification/NotificationToolBar/ToolBar";
import NotificationModal from "@/components/Notification/NotificationModal/NotificationModal";

export default function NotificationPage() {
    
    const notificationsContext = useNotificationContext();
    const controller = useNotificationController(notificationsContext);

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title' },
        { field: 'message', headerName: 'Message' },
        { field: 'type', headerName: 'Type' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <NotificationActions
                    params={params}
                    context={notificationsContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Notifications</Typography>
                <Typography variant="body1">
                    Manage your notifications here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingNotifications}
                rows={notificationsContext.notifications}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={notificationsContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    notificationsContext.setRowSelected(newSelectionModel);
                }}
            />

            <NotificationModal/>
        </Stack>
    )
}
