"use server";

import { ConnectionsCategory } from "../generated/prisma";
import prisma from "../prisma";
import { BetterAuthSession } from "../types";

export async function createBlankConnectionsGame(userId: string) {
    return await prisma.connectionsGame.create({ data: { userId: userId } });
}

export async function createBlankConnectionsCategory(connectionsGameId: string) {
    return await prisma.connectionsCategory.create({ data: { connectionsGameId, title: "" } });
}

export async function getOngoingConnections(session: BetterAuthSession) {
    return await prisma.connectionsGame.findMany({ where: { userId: session.user.id, finalised: false } });
}

export async function updateCategory(category: ConnectionsCategory) {
    return await prisma.connectionsCategory.update({ where: { connectionsCategoryId: category.connectionsCategoryId }, data: { ...category } });
}

export async function deleteCategory(category: ConnectionsCategory) {
    return await prisma.connectionsCategory.delete({ where: { connectionsCategoryId: category.connectionsCategoryId } });
}
