"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { ConnectionsCategory, ConnectionsGame, Prisma } from "@/lib/generated/prisma";
import WriteCategory from "./WriteCategory";
import { ConnectionsGameWithCategories } from "@/lib/types/prisma";

interface CreateConnectionsProps {
    connectionsGame: ConnectionsGameWithCategories;
}

export default function CreateConnections({ connectionsGame }: CreateConnectionsProps) {
    const [game, setGame] = useState(connectionsGame);
    const [categories, setCategories] = useState<ConnectionsCategory[]>([]);

    function addCategory() {
        setCategories((prevCategories) => [
            ...prevCategories,
            { connectionsCategoryId: crypto.randomUUID(), connectionsGameId: "", difficulty: 2, title: "" },
        ]);
    }

    function updateCategoryTitle(title: string) {}
    return (
        <div className="flex flex-col mt-3 w-full">
            <div className="flex justify-center">
                <Button onClick={addCategory} className="w-fit">
                    Create category
                </Button>
            </div>
            <div className="flex flex-col gap-3 w-full">
                {categories.map((category, idx) => (
                    <WriteCategory key={category.connectionsCategoryId} category={category} index={idx} updateCategoryTitle={updateCategoryTitle} />
                ))}
            </div>
        </div>
    );
}
