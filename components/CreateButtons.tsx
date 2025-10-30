"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { createBlankConnectionsGame } from "@/lib/connections/server-actions";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { User } from "better-auth";

export default function CreateButtons({ user }: { user: User }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function createConnections() {
        setLoading(true);
        try {
            const newGame = await createBlankConnectionsGame(user.id);
            return router.push(`/create/connections/${newGame.connectionsGameId}`);
        } catch (e) {
            console.error(e);
            setError(true);
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col gap-3">
            <h1>Create new game</h1>
            <div className="flex flex-col gap-3 ">
                <Button className="cursor-pointer" onClick={createConnections} disabled={loading}>
                    {loading ? <Spinner /> : "Connections"}
                </Button>

                <Button disabled> Wordle</Button>
            </div>
            {error && <div>An error occured</div>}
            {/* TODO PROPER ERROR HANDLING */}
        </div>
    );
}
