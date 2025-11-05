"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import WriteCategory from "./WriteCategory";
import { ConnectionsGameWithCategories } from "@/lib/types/prisma";
import { createBlankConnectionsCategory, deleteCategory, updateCategory, updateCategoryMaxWords } from "@/lib/connections/server-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ConnectionsAlert from "./ConnectionsAlert";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { ConnectionsCategory } from "@/lib/generated/prisma";
import { env } from "@/app/env";
import { AnimatePresence, motion } from "framer-motion";

interface CreateConnectionsProps {
    connectionsGame: ConnectionsGameWithCategories;
}

export default function CreateConnections({ connectionsGame }: CreateConnectionsProps) {
    const [game, setGame] = useState<ConnectionsGameWithCategories>(connectionsGame);
    const [connectionsError, setConnectionsError] = useState(false);
    const [categoryMaxWords, setCategoryMaxWords] = useState(connectionsGame.maxWords);

    async function handleAddCategory() {
        const connectionsCategoryId = crypto.randomUUID();
        const category: ConnectionsCategory = {
            connectionsCategoryId,
            connectionsGameId: game.connectionsGameId,
            difficulty: 0,
            title: null,
            dateCreated: new Date(),
            dateUpdated: new Date(),
        };
        setGame((prev) => ({
            ...prev,
            categories: [...prev.categories, category],
        }));

        try {
            await createBlankConnectionsCategory(connectionsGame.connectionsGameId, connectionsCategoryId);
        } catch (err) {
            removeCategoryFromList(category);
            setConnectionsError(true);
        }
    }

    async function handleUpdateCategory(category: ConnectionsCategory) {
        setGame((prev) => ({
            ...prev,
            categories: prev.categories.map((c) => (c.connectionsCategoryId == category.connectionsCategoryId ? category : c)),
        }));
        await updateCategory(category);
    }

    async function handleDeleteCategory(category: ConnectionsCategory) {
        removeCategoryFromList(category);
        try {
            await deleteCategory(category);
        } catch (err) {
            setConnectionsError(true);
            addCategoryToList(category);
        }
    }

    function removeCategoryFromList(category: ConnectionsCategory) {
        setGame((prev) => ({
            ...prev,
            categories: prev.categories.filter((c) => c.connectionsCategoryId != category.connectionsCategoryId),
        }));
    }

    function addCategoryToList(category: ConnectionsCategory) {
        setGame((prev) => ({
            ...prev,
            categories: [...prev.categories, category],
        }));
    }

    async function handleUpdateMaxWords(max: string) {
        setCategoryMaxWords(+max);
        await updateCategoryMaxWords(game.connectionsGameId, +max);
    }

    function validateDifficulty(category: ConnectionsCategory, difficulty: number) {
        const existing = game.categories.filter((c) => c.connectionsCategoryId != category.connectionsCategoryId && c.difficulty == difficulty);
        existing.forEach((c) => handleUpdateCategory({ ...c, difficulty: 0 }));
        reOrderCategories(category, difficulty);
    }

    function reOrderCategories(category: ConnectionsCategory, newDifficulty: number) {
        const categories = [...game.categories];

        const current = categories.find((c) => c.connectionsCategoryId === category.connectionsCategoryId);
        if (!current) return;

        if (newDifficulty !== 0) {
            const conflict = categories.find((c) => c.difficulty === newDifficulty && c.connectionsCategoryId !== category.connectionsCategoryId);
            if (conflict) {
                conflict.difficulty = 0;
            }
        }

        current.difficulty = newDifficulty;

        const reordered = [
            ...categories.filter((c) => c.difficulty > 0).sort((a, b) => a.difficulty - b.difficulty),
            ...categories.filter((c) => c.difficulty === 0).sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()),
        ];

        setGame((prev) => ({
            ...prev,
            categories: reordered,
        }));
    }

    return (
        <div className="flex flex-col w-full gap-3">
            <div className="flex items-center gap-3">
                <p>Select number of words in category</p>
                <NativeSelect onChange={(e) => handleUpdateMaxWords(e.target.value)} defaultValue={connectionsGame.maxWords}>
                    {[...Array(3)].map((_, idx) => (
                        <NativeSelectOption key={idx} value={idx + 3}>
                            {idx + 3}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <AnimatePresence>
                    {game.categories.map((category) => (
                        <WriteCategory
                            key={category.connectionsCategoryId}
                            category={category}
                            onUpdate={handleUpdateCategory}
                            onDelete={handleDeleteCategory}
                            onChangeDifficulty={validateDifficulty}
                            maxWords={categoryMaxWords}
                        />
                    ))}
                </AnimatePresence>
            </div>
            {game.categories.length < env.NEXT_PUBLIC_MAX_CONNECTIONS_CATEGORIES && (
                <div className="flex">
                    <Button onClick={handleAddCategory} className="w-fit" variant={"outline"}>
                        <FontAwesomeIcon icon={faPlus} />
                        New category
                    </Button>
                </div>
            )}

            {connectionsError && <ConnectionsAlert setOpen={setConnectionsError} />}
        </div>
    );
}
