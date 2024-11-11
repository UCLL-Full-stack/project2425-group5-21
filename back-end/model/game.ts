import { User } from './user';

export class Game {
    private id?: number;
    private startDate: Date;
    private endDate: Date;
    private players: User[];
    private status: string;

    constructor(game: {
        id?: number;
        startDate: Date;
        endDate: Date;
        players: User[];
        status: string;
    }) {
        this.validate(game);

        this.id = game.id;
        this.startDate = game.startDate;
        this.endDate = game.endDate;
        this.players = game.players;
        this.status = game.status;
    }

    getId(): number | undefined {
        return this.id;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getPlayers(): User[] {
        return this.players;
    }

    getStatus(): string {
        return this.status;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    setPlayers(players: User[]): void {
        this.players = players;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    validate(game: { startDate: Date; endDate: Date; players: User[]; status: string }) {
        if (game.startDate === null) {
            throw new Error('Start date is required');
        }
        if (game.endDate === null) {
            throw new Error('End date is required');
        }
        if (game.startDate > game.endDate) {
            throw new Error('Start date cannot be after end date');
        }
        if (!game.players || game.players.length === 0) {
            throw new Error('At least one player is required');
        }
        if (!game.status?.trim()) {
            throw new Error('Status is required');
        }
    }

    equals(game: Game): boolean {
        return (
            this.startDate === game.getStartDate() &&
            this.endDate === game.getEndDate() &&
            this.players.length === game.getPlayers().length &&
            this.status === game.getStatus()
        );
    }
}
