"use client";
import { signOut } from "@/lib/auth-actions";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default function SignOutButton() {
    async function handleSignOut() {
        await signOut();
        redirect(`/`);
    }
    return <Button onClick={handleSignOut}>Sign Out</Button>;
}
