"use client";

import { PropsWithChildren } from "react";
import { Spinner } from "../ui/spinner";
import { connectionsDifficulties } from "@/lib/connections/utils";

export interface ConnectionsWordTileProps extends PropsWithChildren {
    disabled?: boolean;
    error?: boolean;
    onClick: () => void;
    loading: boolean;
    difficultyShade?: number;
}

export default function ConnectionsWordTile({
    disabled = false,
    error = false,
    onClick,
    loading,
    difficultyShade,
    children,
}: ConnectionsWordTileProps) {
    return (
        <div
            style={{ backgroundColor: difficultyShade ? connectionsDifficulties[difficultyShade].colour : undefined }}
            className={`aspect-square font-semibold rounded-lg  cursor-pointer h-20 w-20 flex justify-center items-center text-xl border shadow-xs select-none ${
                difficultyShade
                    ? ` text-slate-800`
                    : "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
            } ${error && "bg-red-400!"}`}
            onClick={() => !disabled && onClick()}
        >
            {loading ? <Spinner /> : children}
        </div>
    );
}
