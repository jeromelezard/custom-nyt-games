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
    updateWord: (word: ConnectionsWord) => void;
    deleteWord: () => void;
    currentWord: ConnectionsWord | null;
    openChange: () => void;
}

export default function AddCategoryWordDialog({
    open,
    setOpen,
    addWord,
    updateWord,
    deleteWord,
    currentWord,
    openChange,
}: AddCategoryWordDialogProps) {
    const [word, setWord] = useState(currentWord?.word || "");
    function handleSubmitWord() {
        currentWord ? updateWord({ ...currentWord, word }) : addWord(word);
        setOpen(false);
        setWord("");
    }

    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{currentWord ? "Edit" : "Add"} word</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <Input
                    placeholder={`${currentWord ? "Edit" : "Add"} word`}
                    defaultValue={currentWord?.word || ""}
                    onChange={(e) => setWord(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmitWord()}
                />

                <DialogFooter className="flex flex-row justify-start">
                    {currentWord && (
                        <Button variant={"destructive"} className="mr-auto" onClick={deleteWord}>
                            Delete
                        </Button>
                    )}
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
