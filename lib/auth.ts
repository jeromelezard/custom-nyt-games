import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { env } from "@/app/env";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),

    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
        // microsoft: {
        //     clientId: env.MICROSOFT_CLIENT_ID,
        //     clientSecret: env.MICROSOFT_CLIENT_SECRET,
        // },
    },
    account: {
        accountLinking: {
            enabled: true,
        },
    },
    plugins: [nextCookies()],
});
