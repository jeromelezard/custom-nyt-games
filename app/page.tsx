import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth-actions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/sign-in");
    }

    return (
        <div className="">
            <SignOutButton />
        </div>
    );
}
