import SignIn from "@/components/SignIn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session) {
        redirect("/");
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div>
                <SignIn />
            </div>
        </div>
    );
}
