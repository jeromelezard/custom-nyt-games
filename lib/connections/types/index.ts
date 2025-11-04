import { ClassName } from "@/lib/types";

export type ConnectionsDifficultiesColours = "Yellow" | "Green" | "Blue" | "Purple" | "Red";

export type ConnectionsDifficulties = { [key in ConnectionsDifficultiesColours]: ClassName };
