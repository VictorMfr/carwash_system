'use client';

import { LocalizationProvider } from "@mui/x-date-pickers";
import StockForm from "./StockForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function StockFormPage() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StockForm />
        </LocalizationProvider>
    )
}