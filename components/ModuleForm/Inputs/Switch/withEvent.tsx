import { ComponentType } from "react";

export default function withEvent(Component: ComponentType, ) {
    return function WithEvent(props: any) {
        return (
            <Component {...props} />
        )
    }
}