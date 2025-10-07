'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { MethodProvider } from "./ContextProvider";
import MethodPage from "./MethodPage/MethodPage";

const MethodIndex = () => {
    return (
        <MethodProvider>
            <MethodPage/>
        </MethodProvider>
    )
}

export default withUIDisplayControls(MethodIndex);
