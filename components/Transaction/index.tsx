'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { TransactionProvider } from "./ContextProvider";
import TransactionPage from "./TransactionPage/TransactionPage";

const TransactionIndex = () => {
    return (
        <TransactionProvider>
            <TransactionPage/>
        </TransactionProvider>
    )
}

export default withUIDisplayControls(TransactionIndex);
