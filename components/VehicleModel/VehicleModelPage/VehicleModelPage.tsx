// VehicleModel Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useVehicleModelContext } from "@/components/VehicleModel/ContextProvider";
import useVehicleModelController from "@/components/VehicleModel/VehicleModelPage/useVehicleModelController";
import VehicleModelActions from "@/components/VehicleModel/VehicleModelActions/VehicleModelActions";
import CustomToolBar from "@/components/VehicleModel/VehicleModelToolBar/ToolBar";
import VehicleModelModal from "@/components/VehicleModel/VehicleModelModal/VehicleModelModal";

export default function VehicleModelPage() {
    
    const vehicleModelContext = useVehicleModelContext();
    const controller = useVehicleModelController(vehicleModelContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Model Name', width: 200 },
        { field: 'created_at', headerName: 'Created At', width: 150 },
        { field: 'updated_at', headerName: 'Updated At', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <VehicleModelActions
                    params={params}
                    context={vehicleModelContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Vehicle Models</Typography>
                <Typography variant="body1">
                    Manage vehicle models here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingVehicleModels}
                rows={vehicleModelContext.vehicleModels}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={vehicleModelContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    vehicleModelContext.setRowSelected(newSelectionModel);
                }}
            />

            <VehicleModelModal/>
        </Stack>
    )
}
