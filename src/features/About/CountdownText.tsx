import {Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
export function CountdownText() {
    const [countdown, setCountdown] = useState(9);
    const internalRef = useRef<any>();

    useEffect(() => {
        internalRef.current = setInterval(() => {
            setCountdown((value) => value - 1)
        }, 1000);

        return () => {
            clearInterval(internalRef.current)
        }
    }, [])

    useEffect(() => {
        if(countdown === 0) {
            clearInterval(internalRef.current)
        }
    }, [countdown])

    return (
        <Typography variant="h5" align="center">
            Coming soon: {countdown}
        </Typography>
    )
}