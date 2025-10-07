'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { OperatorProvider } from "./ContextProvider";
import OperatorPage from "./OperatorPage/OperatorPage";

const OperatorIndex = () => {
    return (
        <OperatorProvider>
            <OperatorPage/>
        </OperatorProvider>
    )
}

export default withUIDisplayControls(OperatorIndex);
