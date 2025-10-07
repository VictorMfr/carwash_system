'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { FinanceProvider } from "./ContextProvider";
import FinancePage from "./FinancePage/FinancePage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FinanceIndex = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FinanceProvider>
                <FinancePage />
            </FinanceProvider>
        </LocalizationProvider>
    )
}

export default withUIDisplayControls(FinanceIndex);
