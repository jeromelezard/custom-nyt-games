"use client";

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { PropsWithChildren, useEffect } from "react";
import { Spinner } from "../ui/spinner";
import { ClassName } from "@/lib/types";

export interface ConnectionsWordTileProps extends PropsWithChildren {
    disabled?: boolean;
    variant: VariantProps<typeof buttonVariants>["variant"];
    onClick: () => void;
    loading: boolean;
    difficultyShade?: ClassName;
}

export default function ConnectionsWordTile({ disabled = false, variant, onClick, loading, difficultyShade, children }: ConnectionsWordTileProps) {
    return (
        <div
            className={`aspect-square font-semibold rounded-lg cursor-pointer h-20 w-20 flex justify-center items-center text-xl border shadow-xs select-none ${
                difficultyShade
                    ? `${difficultyShade} text-slate-800`
                    : "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
            }`}
            onClick={onClick}
        >
            {loading ? <Spinner /> : children}
        </div>
    );
}
