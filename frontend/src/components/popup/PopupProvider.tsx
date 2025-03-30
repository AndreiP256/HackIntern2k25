import { useState, ReactNode } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { PopupContext } from "./PopupContext";

export const PopupProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('info');
    const [open, setOpen] = useState(false);

    const showPopup = (newMessage: string, newSeverity: AlertColor) => {
        setMessage(newMessage);
        setSeverity(newSeverity);
        setOpen(true);
    };

    return (
        <PopupContext.Provider value={{ showPopup }}>
            {children}
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
        </PopupContext.Provider>
    );
};

