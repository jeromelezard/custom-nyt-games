"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { ConnectionsCategory } from "@/lib/generated/prisma";

export default function CreateConnections() {
    const [categories, setCategories] = useState<ConnectionsCategory[]>([]);
    return (
        <div>
            <Button>Create category</Button>
        </div>
    );
}
