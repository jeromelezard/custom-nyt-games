"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function CreateButtons() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-3">
            <h1>Create your own games</h1>
            <div className="flex flex-col gap-3 ">
                <Button className="cursor-pointer" onClick={() => router.push("/create/connections")}>
                    Connections
                </Button>
                <Button disabled> Wordle</Button>
            </div>
        </div>
    );
}
