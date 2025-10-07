'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { StockProvider } from "./ContextProvider";
import StockPage from "./StockPage/StockPage";

const StockIndex = () => {
    return (
        <StockProvider>
            <StockPage/>
        </StockProvider>
    )
}

export default withUIDisplayControls(StockIndex);
