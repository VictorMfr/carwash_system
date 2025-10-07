'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { StockDetailsProvider } from "./ContextProvider";
import StockDetailsPage from "./StockDetailsPage/StockDetailsPage";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const StockDetailsIndex = ({ id }: { id: string }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StockDetailsProvider stockId={id}>
                <StockDetailsPage />
            </StockDetailsProvider>
        </LocalizationProvider>
    )
}

export default withUIDisplayControls(StockDetailsIndex);