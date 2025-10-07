import UIDisplayControlsProvider from "@/hooks/UIDisplayControlsProvider";
import UIControls from "@/components/UIControls";
import { ComponentType } from "react";

export default function withUIDisplayControls(Component: ComponentType<any>) {
    return function WithUIDisplayControls(props: any) {

        return (
            <UIDisplayControlsProvider>
                <Component {...props} />
                <UIControls />
            </UIDisplayControlsProvider>
        );
    }
}