// Vehicle Model Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useVehicleModelContext } from "@/components/ServiceVehicleModel/ContextProvider";
import useVehicleModelController from "@/components/ServiceVehicleModel/VehicleModelPage/useVehicleModelController";
import VehicleModelActions from "@/components/ServiceVehicleModel/VehicleModelActions/VehicleModelActions";
import CustomToolBar from "@/components/ServiceVehicleModel/VehicleModelToolBar/ToolBar";
import VehicleModelModal from "@/components/ServiceVehicleModel/VehicleModelModal/VehicleModelModal";

export default function VehicleModelPage() {
    
    const vehicleModelContext = useVehicleModelContext();
    const controller = useVehicleModelController(vehicleModelContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
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
                    Manage your vehicle models here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingModels}
                rows={vehicleModelContext.models}
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
