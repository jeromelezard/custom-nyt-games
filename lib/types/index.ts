import { HTMLProps } from "react";

export interface ConnectionsAttempt {}

export enum AuthProvider {
    Google = "Google",
    Microsoft = "Microsoft",
}

export type ClassName = HTMLProps<HTMLElement>["className"];
export interface PropsWithClass {
    className?: ClassName;
}
