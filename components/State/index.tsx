'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { StateProvider } from "./ContextProvider";
import StatePage from "./StatePage/StatePage";

const StateIndex = () => {
    return (
        <StateProvider>
            <StatePage/>
        </StateProvider>
    )
}

export default withUIDisplayControls(StateIndex);
