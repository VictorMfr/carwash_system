// Product Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useProductContext } from "@/components/Product/ContextProvider";
import useProductController from "@/components/Product/ProductPage/useProductController";
import ProductActions from "@/components/Product/ProductActions/ProductActions";
import CustomToolBar from "@/components/Product/ProductToolBar/ToolBar";
import ProductModal from "@/components/Product/ProductModal/ProductModal";

export default function ProductPage() {
    
    const productContext = useProductContext();
    const controller = useProductController(productContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'unit', headerName: 'Unit' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <ProductActions
                    params={params}
                    context={productContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Products</Typography>
                <Typography variant="body1">
                    Manage your products here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingProducts}
                rows={productContext.products}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={productContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    productContext.setRowSelected(newSelectionModel);
                }}
            />

            <ProductModal/>
        </Stack>
    )
}
