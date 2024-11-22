import { User } from './user';
import { Game as GamePrisma } from '@prisma/client';

export class Game {
    private id?: number;
    private startDate: Date;
    private endDate: Date;
    private status: string;
    private users: User[];

    constructor(game: {
        id?: number;
        startDate: Date;
        endDate: Date;
        status: string;
        users: User[];
    }) {
        this.validate(game);

        this.id = game.id;
        this.startDate = game.startDate;
        this.endDate = game.endDate;
        this.status = game.status;
        this.users = game.users;
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

    getStatus(): string {
        return this.status;
    }

    getUsers(): User[] {
        return this.users;
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

    setUsers(users: User[]): void {
        this.users = users;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    validate(game: { startDate: Date; endDate: Date; status: string; users: User[] }) {
        if (game.startDate === null) {
            throw new Error('Start date is required');
        }
        if (game.endDate === null) {
            throw new Error('End date is required');
        }
        if (game.startDate > game.endDate) {
            throw new Error('Start date cannot be after end date');
        }
        if (!game.users || game.users.length === 0) {
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
            this.status === game.getStatus() &&
            this.users === game.getUsers()
        );
    }

    // static from({ id, startDate, endDate, status, users }: GamePrisma) {
    //     return new Game({
    //         id,
    //         startDate: new Date(startDate),
    //         endDate: new Date(endDate),
    //         status,
    //         users,
    //     });
    // }
}
