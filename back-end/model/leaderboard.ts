import { TypingTest } from './typingTest';
import { Leaderboard as LeaderboardPrisma, TypingTest as TypingTestPrisma } from '@prisma/client';

export class Leaderboard {
    public id?: number;
    public maxPlayers: number;
    public type: number;
    public scores: TypingTest[];

    constructor(leaderboard: {
        id?: number;
        maxPlayers: number;
        type: number;
        scores: TypingTest[];
    }) {
        this.validate(leaderboard);

        this.id = leaderboard.id;
        this.maxPlayers = leaderboard.maxPlayers;
        this.type = leaderboard.type;
        this.scores = leaderboard.scores;
    }

    getId(): number | undefined {
        return this.id;
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    getType(): number {
        return this.type;
    }

    getScores(): TypingTest[] {
        return this.scores;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setScores(scores: TypingTest[]): void {
        this.scores = scores;
    }

    setMaxPlayers(maxPlayers: number): void {
        this.maxPlayers = maxPlayers;
    }

    setType(type: number): void {
        this.type = type;
    }

    validate(leaderboard: { scores: TypingTest[]; maxPlayers: number; type: number }) {
        if (!leaderboard.scores || leaderboard.scores.length === 0) {
            throw new Error('Scores must contain at least one typing test');
        }

        if (!leaderboard.maxPlayers || leaderboard.maxPlayers <= 0) {
            throw new Error('Max players must be greater than 0');
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
            this.maxPlayers === leaderboard.getMaxPlayers() &&
            this.type === leaderboard.getType() &&
            this.scores.length === leaderboard.getScores().length
        );
    }

    static from({
        id,
        maxPlayers,
        type,
        scores,
    }: LeaderboardPrisma & { scores: TypingTestPrisma[] }): Leaderboard {
        return new Leaderboard({
            id,
            maxPlayers,
            type,
            scores: scores.map((score) => TypingTest.from(score)),
        });
    }
}
