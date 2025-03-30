import { AlertColor } from "@mui/material";
import { createContext } from "react";

interface PopupContextType {
    showPopup: (message: string, severity: AlertColor) => void;
}

export const PopupContext = createContext<PopupContextType | undefined>(undefined);
