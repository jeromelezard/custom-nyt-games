"use client";
import { ConnectionsCategory } from "@/lib/generated/prisma";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface WriteCategoryProps {
    category: ConnectionsCategory;
    index: number;
    updateCategoryTitle: (title: string) => void;
}

export default function WriteCategory({ category, index, updateCategoryTitle }: WriteCategoryProps) {
    const [currentWord, setCurrentWord] = useState("");
    const [newTitle, setNewTitle] = useState("");
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
                        <Input type="text" value={category.title || `Category ${index + 1}`} onChange={(e) => setNewTitle(e.target.value)} />
                        <Button type="submit" variant="outline" disabled={categoryWords.length > 6} onClick={() => updateCategoryTitle(newTitle)}>
                            Confirm
                        </Button>
                    </>
                ) : (
                    <h2 className="font-semibold text-xl">Category {index + 1}</h2>
                )}

                <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={() => setEditTitle(true)} />
            </div>
            <div className="mt-2 flex gap-3 items-center">
                <div className="flex w-full max-w-sm items-center gap-2">
                    <Input type="text" placeholder="Add word..." value={currentWord} onChange={(e) => setCurrentWord(e.target.value)} />
                    <Button type="submit" variant="outline" disabled={categoryWords.length > 6} onClick={() => addCategoryWord(currentWord)}>
                        Add
                    </Button>
                </div>
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
