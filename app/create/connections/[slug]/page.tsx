import CreateConnections from "@/components/connections/CreateConnections";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PropsWithParams } from "@/lib/types";
import { ConnectionsGameWithCategories } from "@/lib/types/prisma";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function CreateConnectionsPage({ params }: PropsWithParams) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const { slug } = await params;
    const connectionsGame = await prisma.connectionsGame.findUnique({
        where: { connectionsGameId: slug },
        include: { categories: true },
    });
    if (!connectionsGame) return notFound();
    if (connectionsGame.userId != session!.user.id) return notFound();

    return (
        <div className="flex flex-col  max-w-lg m-auto">
            <h1>Create Connections game</h1>
            <CreateConnections connectionsGame={connectionsGame} />
        </div>
    );
}
