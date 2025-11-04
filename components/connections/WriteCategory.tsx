"use client";

import { faCheck, faEdit, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import AddCategoryWordDialog from "./AddCategoryWordDialog";
import { addWord, deleteWord, getCategoryWords, reOrderWordsInCategory, updateWord } from "@/lib/connections/server-actions";
import { ConnectionsCategory, ConnectionsWord } from "@/lib/generated/prisma";
import { Reorder } from "framer-motion";
import CreateConnectionsWord from "./CreateConnectionsWord";
import ConnectionsWordTile from "./ConnectionsWordTile";
interface WriteCategoryProps {
    category: ConnectionsCategory;
    onUpdate: (category: ConnectionsCategory) => void;
    onDelete: (category: ConnectionsCategory) => void;
    maxWords: number;
}

export default function WriteCategory({ category, onUpdate, onDelete, maxWords }: WriteCategoryProps) {
    const [categoryWords, setCategoryWords] = useState<ConnectionsWord[]>([]);
    const [loadingWords, setLoadingWords] = useState(true);
    const [title, setTitle] = useState(category.title ? category.title : `Unnamed category`);
    const [editTitle, setEditTitle] = useState(false);
    const [addWordDialog, setAddWordDialog] = useState(false);
    const [wordToUpdate, setWordToUpdate] = useState<ConnectionsWord | null>(null);

    async function fetchCategoryWords() {
        setLoadingWords(true);
        const words = await getCategoryWords(category);
        setCategoryWords(words);
        setLoadingWords(false);
    }

    useEffect(() => {
        fetchCategoryWords();
    }, []);

    async function handleAddWord(word: string) {
        if (categoryWords.length > maxWords) return false;
        const newWord = await addWord(category, word);
        setCategoryWords((prev) => [...prev, newWord]);
    }

    async function handleUpdateWord(word: ConnectionsWord) {
        if (!wordToUpdate) return false;
        setCategoryWords((prev) => prev.map((w) => (w.connectionsWordId == word.connectionsWordId ? word : w)));
        await updateWord(word);
        setWordToUpdate(null);
    }

    function handleUpdateTitle() {
        setEditTitle(false);
        onUpdate({ ...category, title: title });
    }

    function closeWordDialog() {
        setAddWordDialog(false);
        setTimeout(() => setWordToUpdate(null), 100);
    }

    async function handleDeleteWord() {
        if (!wordToUpdate) return false;
        await deleteWord(wordToUpdate);
        setCategoryWords((prev) => prev.filter((word) => word.connectionsWordId != wordToUpdate.connectionsWordId));
        setAddWordDialog(false);
    }

    async function reOrderWords() {
        console.log(categoryWords);
        await reOrderWordsInCategory(categoryWords);
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-1">
                {editTitle ? (
                    <>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdateTitle()}
                        />

                        <FontAwesomeIcon
                            icon={faXmark}
                            className="cursor-pointer hover:bg-slate-500 transition-colors p-2 rounded-lg"
                            onClick={() => setEditTitle(false)}
                        />
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="cursor-pointer hover:bg-slate-500 transition-colors p-2 rounded-lg"
                            onClick={handleUpdateTitle}
                        />
                    </>
                ) : (
                    <h2 className="font-semibold text-xl">{title}</h2>
                )}

                {!editTitle && (
                    <div className="ml-2 flex gap-2">
                        <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={() => setEditTitle(true)} />
                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red-400" onClick={() => onDelete(category)} />
                    </div>
                )}
            </div>
            <div className="flex mt-3">
                <Reorder.Group axis="x" onReorder={setCategoryWords} values={categoryWords} style={{ WebkitOverflowScrolling: "touch" }}>
                    <div className="flex gap-3">
                        {categoryWords.map((word, idx) => (
                            <CreateConnectionsWord
                                key={word.connectionsWordId}
                                word={word}
                                reOrderWords={reOrderWords}
                                loading={loadingWords}
                                variant={idx >= maxWords ? "destructive" : "outline"}
                                onClick={() => {
                                    setWordToUpdate(word);
                                    setAddWordDialog(true);
                                }}
                            >
                                {word.word}
                            </CreateConnectionsWord>
                        ))}
                        {[...Array(Math.max(maxWords - categoryWords.length, 0))].map((_, idx) => (
                            <ConnectionsWordTile key={idx} variant="outline" onClick={() => setAddWordDialog(true)} loading={loadingWords}>
                                <FontAwesomeIcon icon={faPlus} />
                            </ConnectionsWordTile>
                        ))}
                    </div>
                </Reorder.Group>
            </div>

            <AddCategoryWordDialog
                open={addWordDialog}
                setOpen={setAddWordDialog}
                addWord={handleAddWord}
                updateWord={handleUpdateWord}
                deleteWord={handleDeleteWord}
                currentWord={wordToUpdate}
                openChange={closeWordDialog}
            />
        </div>
    );
}
