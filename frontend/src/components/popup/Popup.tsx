import { Alert, Snackbar } from "@mui/material";

interface PopupProps {
    message: string,
    open: boolean,
    setOpen: (value: boolean) => void,
    severity: 'error' | 'info' | 'success' | 'warning',
}

export function Popup({
    message,
    open,
    setOpen,
    severity
}: PopupProps) {
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            >
                <Alert onClose={() => setOpen(false)} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}