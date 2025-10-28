"use server";

import prisma from "../prisma";

export async function createBlankConnectionsGame(userId: string) {
    return await prisma.connectionsGame.create({ data: { userId: userId } });
}

export async function createBlankConnectionsCategory(connectionsGameId: string) {
    return await prisma.connectionsCategory.create({ data: { connectionsGameId, title: "" } });
}
