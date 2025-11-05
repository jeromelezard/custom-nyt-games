import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.url(),
        BETTER_AUTH_SECRET: z.string(),
        BETTER_AUTH_URL: z.url(),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        // MICROSOFT_CLIENT_ID: z.string(),
        // MICROSOFT_CLIENT_SECRET: z.string(),
    },
    client: {
        NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: z.coerce.boolean(),
        NEXT_PUBLIC_MICROSOFT_AUTH_ENABLED: z.coerce.boolean(),
        NEXT_PUBLIC_MAX_CONNECTIONS_CATEGORIES: z.coerce.number().nonnegative(),
    },

    experimental__runtimeEnv: {
        NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED,
        NEXT_PUBLIC_MICROSOFT_AUTH_ENABLED: process.env.NEXT_PUBLIC_MICROSOFT_AUTH_ENABLED,
        NEXT_PUBLIC_MAX_CONNECTIONS_CATEGORIES: process.env.NEXT_PUBLIC_MAX_CONNECTIONS_CATEGORIES,
    },
});
