// Vehicle Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useVehicleContext } from "@/components/Vehicle/ContextProvider";
import useVehicleController from "@/components/Vehicle/VehiclePage/useVehicleController";
import VehicleActions from "@/components/Vehicle/VehicleActions/VehicleActions";
import CustomToolBar from "@/components/Vehicle/VehicleToolBar/ToolBar";
import VehicleModal from "@/components/Vehicle/VehicleModal/VehicleModal";

export default function VehiclePage() {
    
    const vehicleContext = useVehicleContext();
    const controller = useVehicleController(vehicleContext);

    const columns: GridColDef[] = [
        { field: 'license_plate', headerName: 'License Plate', width: 200 },
        { field: 'created_at', headerName: 'Created At', width: 150 },
        { field: 'updated_at', headerName: 'Updated At', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <VehicleActions
                    params={params}
                    context={vehicleContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Vehicles</Typography>
                <Typography variant="body1">
                    Manage your vehicles here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingVehicles}
                rows={vehicleContext.vehicles}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={vehicleContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    vehicleContext.setRowSelected(newSelectionModel);
                }}
            />

            <VehicleModal/>
        </Stack>
    )
}
