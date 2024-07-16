import { createPortal } from "react-dom";
import useMountStatus from "@/components/hooks/useMountStatus";
const withIndependence = (WrappedComponent: any, parentId?: string) => {
    /*
        Allows any component to be wrapped with a safety controller that prevents
        any user (who is not logged in) from accessing that specific page.
    */
    const IndependentWidget = (props:any) => {
        const hasBeenMounted = useMountStatus();
        if (typeof window === "object" && hasBeenMounted) {
            const element = parentId ? document.getElementById(parentId) : document.querySelector("body")
            if (!element) throw `Application crashed, portal creation failed at hcomponent withIndpenendence`
            return createPortal(<WrappedComponent {...props}/>, element);
          }
        return <></>
    }

    return IndependentWidget
}

export default withIndependence