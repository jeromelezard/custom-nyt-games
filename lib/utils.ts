import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { AuthProvider } from "./types";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getIconForProvider(provider: AuthProvider) {
    switch (provider) {
        case "Google":
            return faGoogle;
        case "Microsoft":
            return faMicrosoft;
        default:
            return faQuestion;
    }
}

export const capitalise = (s: string) => s && s[0].toUpperCase() + s.slice(1);
