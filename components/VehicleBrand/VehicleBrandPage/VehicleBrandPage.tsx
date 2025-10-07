// VehicleBrand Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useVehicleBrandContext } from "@/components/VehicleBrand/ContextProvider";
import useVehicleBrandController from "@/components/VehicleBrand/VehicleBrandPage/useVehicleBrandController";
import VehicleBrandActions from "@/components/VehicleBrand/VehicleBrandActions/VehicleBrandActions";
import CustomToolBar from "@/components/VehicleBrand/VehicleBrandToolBar/ToolBar";
import VehicleBrandModal from "@/components/VehicleBrand/VehicleBrandModal/VehicleBrandModal";

export default function VehicleBrandPage() {
    
    const vehicleBrandContext = useVehicleBrandContext();
    const controller = useVehicleBrandController(vehicleBrandContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Brand Name', width: 200 },
        { field: 'created_at', headerName: 'Created At', width: 150 },
        { field: 'updated_at', headerName: 'Updated At', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <VehicleBrandActions
                    params={params}
                    context={vehicleBrandContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Vehicle Brands</Typography>
                <Typography variant="body1">
                    Manage vehicle brands here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingVehicleBrands}
                rows={vehicleBrandContext.vehicleBrands}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={vehicleBrandContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    vehicleBrandContext.setRowSelected(newSelectionModel);
                }}
            />

            <VehicleBrandModal/>
        </Stack>
    )
}
