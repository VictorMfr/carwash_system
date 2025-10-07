// Marketing Page
'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import { useMarketingContext } from "@/components/Marketing/ContextProvider";
import useMarketingController from "@/components/Marketing/MarketingPage/useMarketingController";
import MarketingActions from "@/components/Marketing/MarketingActions/MarketingActions";
import CustomToolBar from "@/components/Marketing/MarketingToolBar/ToolBar";
import MarketingModal from "@/components/Marketing/MarketingModal/MarketingModal";

export default function MarketingPage() {
    
    const marketingsContext = useMarketingContext();
    const controller = useMarketingController(marketingsContext);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name' },
        { field: 'description', headerName: 'Description' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <MarketingActions
                    params={params}
                    context={marketingsContext}
                />
            )
        },
    ];

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h4">Marketing</Typography>
                <Typography variant="body1">
                    Manage your marketing module here.
                </Typography>
            </Stack>

            <DataGrid
                loading={controller.loadingMarketings}
                rows={marketingsContext.marketings}
                columns={columns}
                slots={{
                    toolbar: CustomToolBar,
                }}
                showToolbar
                checkboxSelection
                rowSelection={true}
                disableRowSelectionOnClick
                rowSelectionModel={marketingsContext.rowSelected}
                onRowSelectionModelChange={(newSelectionModel) => {
                    marketingsContext.setRowSelected(newSelectionModel);
                }}
            />

            <MarketingModal/>
        </Stack>
    )
}
