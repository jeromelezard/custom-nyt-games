"use server";

import { ConnectionsCategory, ConnectionsWord } from "../generated/prisma";
import prisma from "../prisma";
import { BetterAuthSession } from "../types";

export async function createBlankConnectionsGame(userId: string) {
    return await prisma.connectionsGame.create({ data: { userId: userId } });
}

export async function createBlankConnectionsCategory(connectionsGameId: string, categoryId?: string) {
    return await prisma.connectionsCategory.create({ data: { connectionsGameId, connectionsCategoryId: categoryId } });
}

export async function getOngoingConnections(session: BetterAuthSession) {
    return await prisma.connectionsGame.findMany({ where: { userId: session.user.id, finalised: false } });
}

export async function updateCategory(category: ConnectionsCategory) {
    return await prisma.connectionsCategory.update({ where: { connectionsCategoryId: category.connectionsCategoryId }, data: { ...category } });
}

export async function getCategoryWords(category: ConnectionsCategory) {
    return await prisma.connectionsWord.findMany({
        where: { connectionsCategoryId: category.connectionsCategoryId },
        orderBy: { positionInCategory: "asc" },
    });
}

export async function addWord(category: ConnectionsCategory, word: string) {
    return await prisma.connectionsWord.create({ data: { word, connectionsCategoryId: category.connectionsCategoryId } });
}

export async function updateWord(word: ConnectionsWord) {
    return await prisma.connectionsWord.update({ where: { connectionsWordId: word.connectionsWordId }, data: { ...word } });
}

export async function reOrderWordsInCategory(words: ConnectionsWord[]) {
    const updatedWords = words.map((word, idx) =>
        prisma.connectionsWord.update({ where: { connectionsWordId: word.connectionsWordId }, data: { positionInCategory: idx + 1 } })
    );

    return await prisma.$transaction(updatedWords);
}

export async function deleteWord(word: ConnectionsWord) {
    return await prisma.connectionsWord.delete({ where: { connectionsWordId: word.connectionsWordId } });
}

export async function deleteCategory(category: ConnectionsCategory) {
    return await prisma.connectionsCategory.delete({ where: { connectionsCategoryId: category.connectionsCategoryId } });
}

export async function updateCategoryMaxWords(connectionsGameId: string, value: number) {
    if (value > 6 || value < 3) throw new Error("Invalid max value.");
    return await prisma.connectionsGame.update({ where: { connectionsGameId }, data: { maxWords: value } });
}
