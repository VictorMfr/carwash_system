// Method Page
'use client';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useMethodContext } from "@/components/Method/ContextProvider";
import useMethodController from "@/components/Method/MethodPage/useMethodController";
import MethodActions from "@/components/Method/MethodActions/MethodActions";
import CustomToolBar from "@/components/Method/MethodToolBar/ToolBar";
import MethodModal from "@/components/Method/MethodModal/MethodModal";

export default function MethodPage() {
    
    const methodContext = useMethodContext();
    const controller = useMethodController(methodContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <MethodActions
                    params={params}
                    context={methodContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Methods</Typography>
                <Typography variant="body1">
                    Manage payment methods here.
                </Typography>
            </Stack>

            <DataGrid
                loading={methodContext.loadingMethods}
                rows={methodContext.methods}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={methodContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    methodContext.setRowSelected(newSelectionModel);
                }}
            />

            <MethodModal/>
        </Stack>
    )
}
