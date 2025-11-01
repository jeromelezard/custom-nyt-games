"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { ConnectionsWord } from "@/lib/generated/prisma";

interface AddCategoryWordDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    addWord: (word: string) => void;
    updateWord: (word: string) => void;
}

export default function AddCategoryWordDialog({ open, setOpen, addWord, updateWord }: AddCategoryWordDialogProps) {
    const [word, setWord] = useState("");
    function handleSubmitWord() {
        addWord(word);
        setOpen(false);
        setWord("");
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add 1st Word</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <Input
                    placeholder="Add word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmitWord()}
                />

                <DialogFooter className="flex flex-row justify-start">
                    <Button variant={"outline"} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant={"default"} onClick={() => handleSubmitWord()} type="submit">
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
