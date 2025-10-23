"use server";

import { auth } from "./auth";
import { redirect } from "next/navigation";

import { headers } from "next/headers";
import { AuthProvider } from "./types";

export async function signIn(provider: AuthProvider, callbackURL: string) {
    const { url } = await auth.api.signInSocial({
        body: {
            provider: provider.toLowerCase(),
            callbackURL,
        },
    });

    if (url) redirect(url);
}

export async function signOut() {
    return await auth.api.signOut({ headers: await headers() });
}
