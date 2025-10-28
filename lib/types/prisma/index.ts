import { Prisma } from "@/lib/generated/prisma";

const connectionsGameWithCategories = Prisma.validator<Prisma.ConnectionsGameDefaultArgs>()({
    include: { categories: true },
});
export type ConnectionsGameWithCategories = Prisma.ConnectionsGameGetPayload<typeof connectionsGameWithCategories>;
