"use client";
import { ConnectionsCategory } from "@/lib/generated/prisma";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface WriteCategoryProps {
    category: ConnectionsCategory;
    index: number;
    onUpdate: (category: ConnectionsCategory) => void;
    onDelete: (category: ConnectionsCategory) => void;
}

export default function WriteCategory({ category, index, onUpdate, onDelete }: WriteCategoryProps) {
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [currentWord, setCurrentWord] = useState("");
    const [newTitle, setNewTitle] = useState(category.title == "" ? `Category ${index + 1}` : category.title);
    const [editTitle, setEditTitle] = useState(false);

    const [categoryWords, setCategoryWords] = useState<string[]>([]);
    function addCategoryWord(newWord: string) {
        setCategoryWords((prevCategoryWords) => [...prevCategoryWords, newWord]);
        setCurrentWord("");
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3">
                {editTitle ? (
                    <>
                        <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <Button variant={"outline"} onClick={() => setEditTitle(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={categoryWords.length > 6}
                            onClick={() => {
                                setEditTitle(false);
                                onUpdate({ ...category, title: newTitle });
                            }}
                        >
                            Confirm
                        </Button>
                    </>
                ) : (
                    <h2 className="font-semibold text-xl">{newTitle}</h2>
                )}

                {!editTitle && (
                    <>
                        <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={() => setEditTitle(true)} />
                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red-400" onClick={() => onDelete(category)} />
                    </>
                )}
            </div>

            <div className="flex gap-3 mt-3">
                {categoryWords.map((word, idx) => (
                    <Button
                        key={idx}
                        disabled
                        variant="outline"
                        className="aspect-square rounded-lg cursor-pointer h-20 w-20 flex justify-center items-center text-xl"
                    >
                        {word}
                    </Button>
                ))}
            </div>
        </div>
    );
}
