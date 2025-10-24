export {};

interface Cards {
    position: number;
    level: number;
}
declare global {
    namespace PrismaJson {
        interface ConnectionsGuess {
            cards: Cards[];
            correct: boolean;
        }
        interface ConnectionsSolvedCategories {
            cards: Cards[];
            level: number;
            orderSolved: number;
        }
    }
}
