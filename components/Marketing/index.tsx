'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { MarketingProvider } from "./ContextProvider";
import MarketingPage from "./MarketingPage/MarketingPage";

const MarketingIndex = () => {
    return (
        <MarketingProvider>
            <MarketingPage/>
        </MarketingProvider>
    )
}

export default withUIDisplayControls(MarketingIndex);
