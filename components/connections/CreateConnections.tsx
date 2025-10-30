"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { ConnectionsCategory } from "@/lib/generated/prisma";
import WriteCategory from "./WriteCategory";
import { ConnectionsGameWithCategories } from "@/lib/types/prisma";
import { createBlankConnectionsCategory, deleteCategory, updateCategory } from "@/lib/connections/server-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteConnectionsDialog from "./DeleteConnectionsDialog";
import { Spinner } from "../ui/spinner";

interface CreateConnectionsProps {
    connectionsGame: ConnectionsGameWithCategories;
}

export default function CreateConnections({ connectionsGame }: CreateConnectionsProps) {
    const [game, setGame] = useState<ConnectionsGameWithCategories>(connectionsGame);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<ConnectionsCategory | null>(null);

    const [loadingCategory, setLoadingCategory] = useState(false);

    async function addCategory() {
        setLoadingCategory(true);
        const category = await createBlankConnectionsCategory(connectionsGame.connectionsGameId);
        setLoadingCategory(false);
        setGame((prev) => ({
            ...prev,
            categories: [...prev.categories, category],
        }));
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
        setGame((prev) => ({
            ...prev,
            categories: prev.categories.filter((c) => c.connectionsCategoryId != categoryToDelete.connectionsCategoryId),
        }));
        await deleteCategory(categoryToDelete);
        setDeleteDialog(false);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-3 w-full">
                {game.categories.map((category, idx) => (
                    <WriteCategory
                        key={category.connectionsCategoryId}
                        category={category}
                        index={idx}
                        onUpdate={handleUpdateCategory}
                        onDelete={handleDeleteCategory}
                    />
                ))}
            </div>
            <div className="flex justify-start items-center">
                {loadingCategory && (
                    <span className="">
                        <Spinner />
                    </span>
                )}
            </div>
            <div className="flex">
                <Button onClick={addCategory} className="w-fit" variant={"outline"}>
                    <FontAwesomeIcon icon={faPlus} />
                    New category
                </Button>
            </div>
            <DeleteConnectionsDialog open={deleteDialog} setOpen={setDeleteDialog} deleteCategory={confirmDeleteCategory} />
        </div>
    );
}
