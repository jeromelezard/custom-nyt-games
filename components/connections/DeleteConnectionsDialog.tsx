"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";

interface DeleteConnectionsDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    deleteCategory: () => void;
}

export default function DeleteConnectionsDialog({ open, setOpen, deleteCategory }: DeleteConnectionsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Delete category</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this category?</DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-row justify-start">
                    <Button variant={"outline"} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant={"destructive"} onClick={deleteCategory}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
