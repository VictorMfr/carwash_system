// Type Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useTypeContext } from "@/components/Type/ContextProvider";
import useTypeController from "@/components/Type/TypePage/useTypeController";
import TypeActions from "@/components/Type/TypeActions/TypeActions";
import CustomToolBar from "@/components/Type/TypeToolBar/ToolBar";
import TypeModal from "@/components/Type/TypeModal/TypeModal";

export default function TypePage() {
    
    const typeContext = useTypeContext();
    const controller = useTypeController(typeContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'created_at', headerName: 'Created At', width: 150 },
        { field: 'updated_at', headerName: 'Updated At', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <TypeActions
                    params={params}
                    context={typeContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Types</Typography>
                <Typography variant="body1">
                    Manage transaction types here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingTypes}
                rows={typeContext.types}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={typeContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    typeContext.setRowSelected(newSelectionModel);
                }}
            />

            <TypeModal/>
        </Stack>
    )
}
