import { useEffect, useRef } from "react"

/** 
 * @description A simple hook that ensures that an event is NOT executed twice 
*/
const useSingleActionGuard = () => {
    const elementRef: any = useRef()
    useEffect(() => {
        const element: any = elementRef.current
        if (element instanceof HTMLElement) {   
            const handleEvent = (ev:any) => {
                if (element?.onclick) 
                    element.onclick(ev)
                elementRef?.current?.removeEventListener('click', handleEvent)
            }
            element.addEventListener("click", handleEvent)
            return () => {
                element.removeEventListener("click", handleEvent);
            };    
        }
    }, [elementRef])

    return elementRef
}

export default useSingleActionGuard