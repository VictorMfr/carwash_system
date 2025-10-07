// State Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useStateContext } from "@/components/State/ContextProvider";
import useStateController from "@/components/State/StatePage/useStateController";
import StateActions from "@/components/State/StateActions/StateActions";
import CustomToolBar from "@/components/State/StateToolBar/ToolBar";
import StateModal from "@/components/State/StateModal/StateModal";

export default function StatePage() {
    
    const stateContext = useStateContext();
    const controller = useStateController(stateContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <StateActions
                    params={params}
                    context={stateContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">States</Typography>
                <Typography variant="body1">
                    Manage your states here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingStates}
                rows={stateContext.states}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={stateContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    stateContext.setRowSelected(newSelectionModel);
                }}
            />

            <StateModal/>
        </Stack>
    )
}
