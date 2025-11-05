"use client";

import { faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AddCategoryWordDialog from "./AddCategoryWordDialog";
import { addWord, deleteWord, getCategoryWords, reOrderWordsInCategory, updateWord } from "@/lib/connections/server-actions";
import { ConnectionsCategory, ConnectionsWord } from "@/lib/generated/prisma";
import { Reorder } from "framer-motion";
import CreateConnectionsWord from "./CreateConnectionsWord";
import ConnectionsWordTile from "./ConnectionsWordTile";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { connectionsDifficulties } from "@/lib/connections/utils";
import { motion } from "framer-motion";
import EditCategoryDialog from "./EditCategoryDialog";

interface WriteCategoryProps {
    category: ConnectionsCategory;
    onUpdate: (category: ConnectionsCategory) => void;
    onDelete: (category: ConnectionsCategory) => void;
    onChangeDifficulty: (category: ConnectionsCategory, difficulty: number) => void;

    maxWords: number;
}

export default function WriteCategory({ category, onUpdate, onDelete, onChangeDifficulty, maxWords }: WriteCategoryProps) {
    const [categoryWords, setCategoryWords] = useState<ConnectionsWord[]>([]);
    const [loadingWords, setLoadingWords] = useState(true);
    const [editTitleDialog, setEditTitleDialog] = useState(false);
    const [addWordDialog, setAddWordDialog] = useState(false);
    const [wordToUpdate, setWordToUpdate] = useState<ConnectionsWord | null>(null);
    const [maxWordError, setMaxWordError] = useState(false);

    async function fetchCategoryWords() {
        setLoadingWords(true);
        const words = await getCategoryWords(category);
        setCategoryWords(words);
        setLoadingWords(false);
    }

    useEffect(() => {
        fetchCategoryWords();
    }, []);

    useEffect(() => {
        if (categoryWords.length > maxWords) setMaxWordError(true);
        else setMaxWordError(false);
    }, [categoryWords.length]);

    useEffect(() => {
        if (categoryWords.length > maxWords) {
            onUpdate({ ...category, difficulty: 0 });
            setMaxWordError(true);
        } else {
            setMaxWordError(false);
        }
    }, [maxWords]);

    async function handleAddWord(word: string) {
        if (categoryWords.length >= maxWords || word.trim() == "") return false;

        const newWord = await addWord(category, word);
        setCategoryWords((prev) => [...prev, newWord]);
    }

    async function handleUpdateWord(word: ConnectionsWord) {
        if (!wordToUpdate) return false;
        setCategoryWords((prev) => prev.map((w) => (w.connectionsWordId == word.connectionsWordId ? word : w)));
        await updateWord(word);
        setWordToUpdate(null);
    }

    function handleUpdateTitle(title: string) {
        setEditTitleDialog(false);
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
        closeWordDialog();
    }

    function handleDeleteCategory() {
        onDelete(category);
        setEditTitleDialog(false);
    }

    async function reOrderWords() {
        await reOrderWordsInCategory(categoryWords);
    }

    function handleSetDifficulty(difficulty: string) {
        onChangeDifficulty(category, +difficulty);
        onUpdate({ ...category, difficulty: +difficulty });
    }

    return (
        <motion.div
            id={category.connectionsCategoryId}
            key={category.connectionsCategoryId}
            className="flex flex-col"
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="flex items-center gap-1">
                <h2 className="font-semibold text-xl">{category.title || "Unnamed category"}</h2>

                <FontAwesomeIcon icon={faCog} className="cursor-pointer opacity-80" onClick={() => setEditTitleDialog(true)} />
            </div>
            <div className="flex mt-3 gap-3 flex-col">
                <motion.div layout={false}>
                    <Reorder.Group
                        axis="x"
                        layout="position"
                        onReorder={setCategoryWords}
                        values={categoryWords}
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        <div className="flex gap-3">
                            {categoryWords.map((word, idx) => (
                                <CreateConnectionsWord
                                    key={word.connectionsWordId}
                                    word={word}
                                    reOrderWords={reOrderWords}
                                    difficultyShade={category.difficulty}
                                    loading={loadingWords}
                                    error={idx >= maxWords}
                                    disabled={loadingWords}
                                    onClick={() => {
                                        setWordToUpdate(word);
                                        setAddWordDialog(true);
                                    }}
                                >
                                    {word.word}
                                </CreateConnectionsWord>
                            ))}

                            {[...Array(Math.max(maxWords - categoryWords.length, 0))].map((_, idx) => (
                                <Reorder.Item key={idx} value={`addWord-${idx}`} transition={{ layout: { duration: 0 } }} dragListener={false}>
                                    <ConnectionsWordTile disabled={loadingWords} onClick={() => setAddWordDialog(true)} loading={loadingWords}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </ConnectionsWordTile>
                                </Reorder.Item>
                            ))}
                        </div>
                    </Reorder.Group>
                </motion.div>

                <NativeSelect onChange={(e) => handleSetDifficulty(e.target.value)} value={category.difficulty} disabled={maxWordError}>
                    {connectionsDifficulties.map((difficulty, idx) => (
                        <NativeSelectOption key={idx} value={idx}>
                            {difficulty.name}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>
            </div>
            <EditCategoryDialog
                open={editTitleDialog}
                setOpen={setEditTitleDialog}
                deleteCategory={handleDeleteCategory}
                updateTitle={handleUpdateTitle}
                currentTitle={category.title || "Unnamed category"}
            />
            <AddCategoryWordDialog
                open={addWordDialog}
                setOpen={setAddWordDialog}
                addWord={handleAddWord}
                updateWord={handleUpdateWord}
                deleteWord={handleDeleteWord}
                currentWord={wordToUpdate}
                openChange={closeWordDialog}
            />
        </motion.div>
    );
}
