'use client';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StockDetailsForm from "./StockDetailsForm";
import { LocalizationProvider } from "@mui/x-date-pickers";

export default function StockDetailsFormPage() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StockDetailsForm />
        </LocalizationProvider>
    )
}