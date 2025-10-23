"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIconForProvider } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "@/lib/auth-actions";
import { usePathname } from "next/navigation";
import { env } from "@/app/env";
import { AuthProvider } from "@/lib/types";
import Link from "next/link";

export default function SignIn() {
    const pathname = usePathname();
    const [chosenProvider, setChosenProvider] = useState<AuthProvider | null>(null);

    function isProviderEnabled(provider: AuthProvider) {
        if (provider == "Google" && env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED) return true;
        if (provider == "Microsoft" && env.NEXT_PUBLIC_MICROSOFT_AUTH_ENABLED) return true;
        return false;
    }

    async function signInSocial(provider: AuthProvider) {
        setChosenProvider(provider);
        await signIn(provider, pathname);
    }

    useEffect(() => {
        setTimeout(() => {
            setChosenProvider(null);
        }, 5000);
    }, [chosenProvider]);

    return (
        <div className="w-full h-screen flex flex-col  justify-center gap-5 max-w-sm">
            <Link href="/" className="flex flex-row items-center gap-3 mb-2">
                <span className="font-extrabold ">Custom NYT</span>
            </Link>
            <header>
                <h1 className="mb-1">Sign in to continue</h1>
                <p className="text-slate-500">Sign in to create some games!</p>
            </header>
            <div className="flex w-full flex-wrap gap-3">
                {Object.values(AuthProvider).map((provider, index) => (
                    <Button
                        key={index}
                        variant={"outline"}
                        onClick={() => signInSocial(provider)}
                        disabled={!!chosenProvider || !isProviderEnabled(provider)}
                        className={"cursor-pointer"}
                    >
                        {chosenProvider == provider ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            <FontAwesomeIcon icon={getIconForProvider(provider)} />
                        )}

                        {provider}
                    </Button>
                ))}
            </div>
        </div>
    );
}
