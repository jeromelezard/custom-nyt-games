"use client";

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { PropsWithChildren } from "react";
import { Spinner } from "../ui/spinner";

export interface ConnectionsWordTileProps extends PropsWithChildren {
    disabled?: boolean;
    variant: VariantProps<typeof buttonVariants>["variant"];
    onClick: () => void;
    loading: boolean;
}

export default function ConnectionsWordTile({ disabled = false, variant, onClick, loading, children }: ConnectionsWordTileProps) {
    return (
        <Button
            variant={variant}
            disabled={disabled}
            className="aspect-square rounded-lg cursor-pointer h-20 w-20 flex justify-center items-center text-xl select-none"
            onClick={onClick}
        >
            {loading ? <Spinner /> : children}
        </Button>
    );
}
