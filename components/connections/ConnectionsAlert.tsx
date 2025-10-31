"use client";

import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

export default function ConnectionsAlert({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Alert variant="destructive" className="bg-accent flex items-center whitespace-break-spaces h-auto">
            <AlertCircleIcon />
            <AlertTitle className="w-full">Something went wrong updating Connections game.</AlertTitle>
            <div className="flex justify-end">
                <Button variant={"outline"} onClick={() => setOpen(false)}>
                    Close
                </Button>
            </div>
        </Alert>
    );
}
