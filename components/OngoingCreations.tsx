"use client";

import { BetterAuthSession } from "@/lib/types";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

import { getOngoingConnections } from "@/lib/connections/server-actions";
import { ConnectionsGame } from "@/lib/generated/prisma";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function OngoingCreations({ session }: { session: BetterAuthSession }) {
    const router = useRouter();
    const [games, setGames] = useState<ConnectionsGame[]>([]);

    const [loading, setLoading] = useState(false);

    async function fetchGames() {
        setLoading(true);
        const games = await getOngoingConnections(session);
        setGames(() => games.map((game) => game));
        setLoading(false);
    }
    if (games.length == 0) return null;

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="flex flex-col mt-3 gap-3">
            <h2 className="font-semibold text-xl">Ongoing Connections games</h2>
            {loading ? (
                <span className="flex justify-center">
                    <Spinner />
                </span>
            ) : (
                games.map((game, idx) => (
                    <Button
                        variant={"outline"}
                        key={game.connectionsGameId}
                        onClick={() => router.push(`/create/connections/${game.connectionsGameId}`)}
                        className="bg-slate-600 p-3"
                    >
                        {game.title ?? `Connections game #${idx + 1}`}
                    </Button>
                ))
            )}
        </div>
    );
}
