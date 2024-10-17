export class Leaderboard {
    private id: number;
    private rankings: [];
    private maxPlayers: number;

    constructor(leaderboard: { id: number; rankings: []; maxPlayers: number }) {
        this.validate(leaderboard);

        this.id = leaderboard.id;
        this.rankings = leaderboard.rankings;
        this.maxPlayers = leaderboard.maxPlayers;
    }

    getId(): number {
        return this.id;
    }

    getRankings(): [] {
        return this.rankings;
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    setId(id: number): void {
        this.id = id;
    }

    setRankings(rankings: []): void {
        this.rankings = rankings;
    }

    setMaxPlayers(maxPlayers: number): void {
        this.maxPlayers = maxPlayers;
    }

    validate(leaderboard: { rankings: []; maxPlayers: number }) {
        if (!leaderboard.rankings || leaderboard.rankings.length === 0) {
            throw new Error('Rankings must contain at least one player');
        }
        if (!leaderboard.maxPlayers || leaderboard.maxPlayers <= 0) {
            throw new Error('Max players must be greater than 0');
        }
    }

    equals(leaderboard: Leaderboard): boolean {
        return (
            this.id === leaderboard.getId() &&
            this.rankings.length === leaderboard.getRankings().length &&
            this.maxPlayers === leaderboard.getMaxPlayers()
        );
    }
}
