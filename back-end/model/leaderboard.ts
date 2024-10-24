import { User } from './user';

export class Leaderboard {
    private id?: number;
    private rankings: User[];
    private maxPlayers: number;
    private type: number | null;

    constructor(leaderboard: { id?: number; rankings: User[]; maxPlayers: number; type: number | null }) {
        this.validate(leaderboard);

        this.id = leaderboard.id;
        this.rankings = leaderboard.rankings;
        this.maxPlayers = leaderboard.maxPlayers;
        this.type = leaderboard.type;
    }

    getId(): number | undefined {
        return this.id;
    }

    getRankings(): User[] {
        return this.rankings;
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    getType(): number | null {
        return this.type;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setRankings(rankings: User[]): void {
        this.rankings = rankings;
    }

    setMaxPlayers(maxPlayers: number): void {
        this.maxPlayers = maxPlayers;
    }

    setType(type: number | null): void {
        this.type = type;
    }

    validate(leaderboard: { rankings: User[]; maxPlayers: number; type: number | null }) {
        if (!leaderboard.rankings || leaderboard.rankings.length === 0) {
            throw new Error('Rankings must contain at least one player');
        }
        if (!leaderboard.maxPlayers || leaderboard.maxPlayers <= 0) {
            throw new Error('Max players must be greater than 0');
        }
        if (!leaderboard.type) {
            throw new Error('Type is required');
        }
        if (![15, 30, 60].includes(leaderboard.type)) {
            throw new Error('Type must only be 15, 30, or 60');
        }
    }

    equals(leaderboard: Leaderboard): boolean {
        return (
            this.id === leaderboard.getId() &&
            this.rankings.length === leaderboard.getRankings().length &&
            this.maxPlayers === leaderboard.getMaxPlayers() &&
            this.type === leaderboard.getType()
        );
    }
}
