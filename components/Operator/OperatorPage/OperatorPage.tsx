// Operator Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useOperatorContext } from "@/components/Operator/ContextProvider";
import useOperatorController from "@/components/Operator/OperatorPage/useOperatorController";
import OperatorActions from "@/components/Operator/OperatorActions/OperatorActions";
import CustomToolBar from "@/components/Operator/OperatorToolBar/ToolBar";
import OperatorModal from "@/components/Operator/OperatorModal/OperatorModal";

export default function OperatorPage() {
    
    const operatorContext = useOperatorContext();
    const controller = useOperatorController(operatorContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'lastname', headerName: 'Last Name' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'address', headerName: 'Address' },
        { field: 'avatar', headerName: 'Avatar' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <OperatorActions
                    params={params}
                    context={operatorContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Operators</Typography>
                <Typography variant="body1">
                    Manage your operators here.
                </Typography>
            </Stack>

            <DataGrid
                loading={operatorContext.loadingOperators}
                rows={operatorContext.operators}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={operatorContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    operatorContext.setRowSelected(newSelectionModel);
                }}
            />

            <OperatorModal/>
        </Stack>
    )
}
