import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";

export interface ErrorBoundaryPropsWithRender {
    error: Error;
    resetErrorBoundary: () => void;
}

export default function FallbackRender({ error, resetErrorBoundary }: ErrorBoundaryPropsWithRender) {

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}