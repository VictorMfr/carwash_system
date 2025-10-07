// Stock Details Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useStockDetailsContext } from "@/components/StockDetails/ContextProvider";
import useStockDetailsController from "@/components/StockDetails/StockDetailsPage/useStockDetailsController";
import StockDetailsActions from "@/components/StockDetails/StockDetailsActions/StockDetailsActions";
import CustomToolBar from "@/components/StockDetails/StockDetailsToolBar/ToolBar";
import React from "react";
import PictureCell from "../PictureCell";
import StockDetailsModal from "../StockDetailsModal/StockDetailsModal";

export default function StockDetailsPage() {
    
    const stockDetailsContext = useStockDetailsContext();
    const controller = useStockDetailsController(stockDetailsContext);

    const columns: GridColDef[] = [
        {
            field: 'picture',
            headerName: 'Picture',
            renderCell: PictureCell
        },
        { field: 'brand', headerName: 'Brand' },
        { field: 'state', headerName: 'State' },
        { field: 'quantity', headerName: 'Quantity' },
        { field: 'price', headerName: 'Price' },
        { field: 'entry_date', headerName: 'Entry Date' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 150, 
            renderCell: (params) => (
                <StockDetailsActions 
                    params={params} 
                    context={stockDetailsContext} 
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Stock Details</Typography>
                <Typography variant="body1">Details for stock #{stockDetailsContext.stockId}</Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingDetails}
                rows={stockDetailsContext.details}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={stockDetailsContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    stockDetailsContext.setRowSelected(newSelectionModel);
                }}
            />
            <StockDetailsModal/>
        </Stack>
    )
}
