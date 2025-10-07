// Brand Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useBrandContext } from "@/components/Brand/ContextProvider";
import useBrandController from "@/components/Brand/BrandPage/useBrandController";
import BrandActions from "@/components/Brand/BrandActions/BrandActions";
import CustomToolBar from "@/components/Brand/BrandToolBar/ToolBar";
import BrandModal from "@/components/Brand/BrandModal/BrandModal";

export default function BrandPage() {
    
    const brandContext = useBrandContext();
    const controller = useBrandController(brandContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <BrandActions
                    params={params}
                    context={brandContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Brands</Typography>
                <Typography variant="body1">
                    Manage your brands here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingBrands}
                rows={brandContext.brands}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={brandContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    brandContext.setRowSelected(newSelectionModel);
                }}
            />

            <BrandModal/>
        </Stack>
    )
}
