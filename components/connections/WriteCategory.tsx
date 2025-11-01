"use client";

import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ConnectionsCategoryWithWords } from "@/lib/types/prisma";
import AddCategoryWordDialog from "./AddCategoryWordDialog";
import { addWord, updateWord } from "@/lib/connections/server-actions";
import { ConnectionsWord } from "@/lib/generated/prisma";

interface WriteCategoryProps {
    category: ConnectionsCategoryWithWords;
    onUpdate: (category: ConnectionsCategoryWithWords) => void;
    onDelete: (category: ConnectionsCategoryWithWords) => void;
    onUpdateWords: () => void;
    maxWords: number;
}

export default function WriteCategory({ category, onUpdate, onDelete, onUpdateWords, maxWords }: WriteCategoryProps) {
    const [title, setTitle] = useState(category.title ? category.title : `Unnamed category`);
    const [editTitle, setEditTitle] = useState(false);
    const [addWordDialog, setAddWordDialog] = useState(false);
    const [wordToUpdate, setWordToUpdate] = useState<ConnectionsWord | null>(null);

    async function handleAddWord(word: string) {
        if (category.words.length > maxWords) return false;
        await addWord(category, word);
    }

    async function handleUpdateWord(word: string) {
        if (!wordToUpdate) return false;
        await updateWord(wordToUpdate, word);
        setWordToUpdate(null);
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3">
                {editTitle ? (
                    <>
                        <Input type="text" value={title ?? ""} onChange={(e) => setTitle(e.target.value)} />
                        <Button variant={"outline"} onClick={() => setEditTitle(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="outline"
                            onClick={() => {
                                setEditTitle(false);
                                onUpdate({ ...category, title: title });
                            }}
                        >
                            Confirm
                        </Button>
                    </>
                ) : (
                    <h2 className="font-semibold text-xl">{title}</h2>
                )}

                {!editTitle && (
                    <>
                        <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={() => setEditTitle(true)} />
                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red-400" onClick={() => onDelete(category)} />
                    </>
                )}
            </div>

            <div className="flex gap-3 mt-3">
                {category.words.map((word) => (
                    <Button
                        key={word.connectionsWordId}
                        variant="outline"
                        className="aspect-square rounded-lg cursor-pointer h-20 w-20 flex justify-center items-center text-xl"
                        onClick={() => setAddWordDialog(true)}
                    >
                        {word.word}
                    </Button>
                ))}
                {[...Array(maxWords - category.words.length)].map((_, idx) => (
                    <Button
                        key={idx}
                        variant="outline"
                        className="aspect-square rounded-lg cursor-pointer h-20 w-20 flex justify-center items-center text-xl"
                        onClick={() => setAddWordDialog(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                ))}
            </div>
            <AddCategoryWordDialog open={addWordDialog} setOpen={setAddWordDialog} addWord={handleAddWord} updateWord={handleUpdateWord} />
        </div>
    );
}
