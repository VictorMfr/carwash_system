'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { BrandProvider } from "./ContextProvider";
import BrandPage from "./BrandPage/BrandPage";

const BrandIndex = () => {
    return (
        <BrandProvider>
            <BrandPage/>
        </BrandProvider>
    )
}

export default withUIDisplayControls(BrandIndex);
