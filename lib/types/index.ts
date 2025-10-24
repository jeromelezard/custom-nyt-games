import { HTMLProps } from "react";
import { auth } from "../auth";
import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient();

export interface ConnectionsAttempt {}

export enum AuthProvider {
    Google = "Google",
    Microsoft = "Microsoft",
}

export type ClassName = HTMLProps<HTMLElement>["className"];
export interface PropsWithClass {
    className?: ClassName;
}

export type BetterAuthSession = typeof auth.$Infer.Session;
export type BetterAuthClientSession = typeof authClient.$Infer.Session;
