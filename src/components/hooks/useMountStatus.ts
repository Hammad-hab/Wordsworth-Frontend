import { useEffect, useState } from "react"

const useMountStatus = () => {
    const [isMounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    return isMounted
}

export default useMountStatus