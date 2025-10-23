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
    },
    // runtimeEnv: {
    //     DATABASE_URL: process.env.DATABASE_URL,
    //     BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    //     BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    //     GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    //     GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    //     // MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
    //     // MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
    //     NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED,
    //     NEXT_PUBLIC_MICROSOFT_AUTH_ENABLED: process.env.NEXT_PUBLIC_MICROSOFT_AUTH_ENABLED,
    // },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED,
        NEXT_PUBLIC_MICROSOFT_AUTH_ENABLED: process.env.NEXT_PUBLIC_MICROSOFT_AUTH_ENABLED,
    },
});
