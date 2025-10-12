'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ServiceFormPage from "./ServiceFormPage/ServiceFormPage";

const ServiceFormIndex = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ServiceFormPage />
        </LocalizationProvider>
    )
}

export default withUIDisplayControls(ServiceFormIndex);