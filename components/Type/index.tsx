'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { TypeProvider } from "./ContextProvider";
import TypePage from "./TypePage/TypePage";

const TypeIndex = () => {
    return (
        <TypeProvider>
            <TypePage/>
        </TypeProvider>
    )
}

export default withUIDisplayControls(TypeIndex);
