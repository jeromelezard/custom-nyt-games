"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

interface EditCategoryDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    updateTitle: (title: string) => void;
    deleteCategory: () => void;
    currentTitle: string;
}

export default function EditCategoryDialog({ open, setOpen, updateTitle, deleteCategory, currentTitle }: EditCategoryDialogProps) {
    const [title, setTitle] = useState(currentTitle);
    const [confirmDelete, setConfirmDelete] = useState(false);

    function handleUpdateTitle() {
        updateTitle(title);
    }

    function handleDeleteCategory() {
        deleteCategory();
        setConfirmDelete(false);
    }

    function closeEditDialog() {
        setConfirmDelete(false);
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={closeEditDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update title</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <Input
                    placeholder={title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUpdateTitle()}
                />

                <DialogFooter className="flex flex-row justify-start">
                    <div className="flex gap-3 mr-auto">
                        <Button variant={"destructive"} onClick={() => setConfirmDelete(true)}>
                            Delete
                        </Button>
                        {confirmDelete && (
                            <Button variant={"outline"} onClick={handleDeleteCategory}>
                                Confirm
                            </Button>
                        )}
                    </div>

                    <Button variant={"outline"} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant={"default"} onClick={() => handleUpdateTitle()} type="submit">
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
