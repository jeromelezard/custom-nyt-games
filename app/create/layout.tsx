import Header from "@/components/layout/Header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreatePage({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/sign-in");
    }

    return (
        <div>
            <Header session={session} />
            {children}
        </div>
    );
}
