"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import WriteCategory from "./WriteCategory";
import { ConnectionsGameWithCategories } from "@/lib/types/prisma";
import { createBlankConnectionsCategory, deleteCategory, updateCategory, updateCategoryMaxWords } from "@/lib/connections/server-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteConnectionsDialog from "./DeleteConnectionsDialog";
import ConnectionsAlert from "./ConnectionsAlert";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { ConnectionsCategory } from "@/lib/generated/prisma";

interface CreateConnectionsProps {
    connectionsGame: ConnectionsGameWithCategories;
}

export default function CreateConnections({ connectionsGame }: CreateConnectionsProps) {
    const [game, setGame] = useState<ConnectionsGameWithCategories>(connectionsGame);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<ConnectionsCategory | null>(null);
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

    function handleDeleteCategory(category: ConnectionsCategory) {
        setCategoryToDelete(category);
        setDeleteDialog(true);
    }

    async function confirmDeleteCategory() {
        if (!categoryToDelete) return false;
        removeCategoryFromList(categoryToDelete);
        setDeleteDialog(false);
        try {
            await deleteCategory(categoryToDelete);
        } catch (err) {
            setConnectionsError(true);
            addCategoryToList(categoryToDelete);
        }
        setCategoryToDelete(null);
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
        setCategoryMaxWords(parseInt(max));
        await updateCategoryMaxWords(game.connectionsGameId, parseInt(max));
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
                {game.categories.map((category) => (
                    <WriteCategory
                        key={category.connectionsCategoryId}
                        category={category}
                        onUpdate={handleUpdateCategory}
                        onDelete={handleDeleteCategory}
                        maxWords={categoryMaxWords}
                    />
                ))}
            </div>
            <div className="flex">
                <Button onClick={handleAddCategory} className="w-fit" variant={"outline"}>
                    <FontAwesomeIcon icon={faPlus} />
                    New category
                </Button>
            </div>
            {connectionsError && <ConnectionsAlert setOpen={setConnectionsError} />}
            <DeleteConnectionsDialog open={deleteDialog} setOpen={setDeleteDialog} deleteCategory={confirmDeleteCategory} />
        </div>
    );
}
