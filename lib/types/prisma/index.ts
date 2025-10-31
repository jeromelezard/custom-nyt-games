import { Prisma } from "@/lib/generated/prisma";

const connectionsGameWithCategories = Prisma.validator<Prisma.ConnectionsGameDefaultArgs>()({
    include: { categories: { include: { words: true } } },
});
export type ConnectionsGameWithCategories = Prisma.ConnectionsGameGetPayload<typeof connectionsGameWithCategories>;

const connectionsCategoryWithWords = Prisma.validator<Prisma.ConnectionsCategoryDefaultArgs>()({
    include: { words: true },
});
export type ConnectionsCategoryWithWords = Prisma.ConnectionsCategoryGetPayload<typeof connectionsCategoryWithWords>;
