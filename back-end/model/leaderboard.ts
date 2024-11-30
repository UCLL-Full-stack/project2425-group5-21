import { TypingTest } from './typingTest';
import { Leaderboard as LeaderboardPrisma, TypingTest as TypingTestPrisma } from '@prisma/client';

export class Leaderboard {
    readonly id?: number;
    readonly maxScores: number;
    readonly type: number;
    readonly scores: TypingTest[];

    constructor(leaderboard: {
        id?: number;
        maxScores: number;
        type: number;
        scores: TypingTest[];
    }) {
        this.validate(leaderboard);

        this.id = leaderboard.id;
        this.maxScores = leaderboard.maxScores;
        this.type = leaderboard.type;
        this.scores = leaderboard.scores;
    }

    getId(): number | undefined {
        return this.id;
    }

    getMaxScores(): number {
        return this.maxScores;
    }

    getType(): number {
        return this.type;
    }

    getScores(): TypingTest[] {
        return this.scores;
    }

    validate(leaderboard: { scores: TypingTest[]; maxScores: number; type: number }) {
        if (!leaderboard.scores || leaderboard.scores.length === 0) {
            throw new Error('Scores must contain at least one typing test');
        }

        if (!leaderboard.maxScores || leaderboard.maxScores <= 0) {
            throw new Error('Max players must be a positive integer');
        }

        if (!leaderboard.type) {
            throw new Error('Type is required');
        }

        if (![15, 30, 60].includes(leaderboard.type)) {
            throw new Error('Type must be either 15, 30, or 60');
        }
    }

    equals(leaderboard: Leaderboard): boolean {
        return (
            this.id === leaderboard.getId() &&
            this.maxScores === leaderboard.getMaxScores() &&
            this.type === leaderboard.getType() &&
            this.scores.length === leaderboard.getScores().length
        );
    }

    static from({
        id,
        maxScores,
        type,
        scores,
    }: LeaderboardPrisma & { scores: TypingTestPrisma[] }): Leaderboard {
        return new Leaderboard({
            id,
            maxScores,
            type,
            scores: scores.map((score) => TypingTest.from(score)),
        });
    }
}
