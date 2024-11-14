import { Profile } from './profile';
import { Leaderboard as LeaderboardPrisma, Profile as ProfilePrisma } from '@prisma/client';

export class Leaderboard {
    private id?: number;
    private maxPlayers: number;
    private type: number;
    private profiles: Profile[];

    constructor(leaderboard: {
        id?: number;
        maxPlayers: number;
        type: number;
        profiles: Profile[];
    }) {
        this.validate(leaderboard);

        this.id = leaderboard.id;
        this.maxPlayers = leaderboard.maxPlayers;
        this.type = leaderboard.type;
        this.profiles = leaderboard.profiles;
    }

    getId(): number | undefined {
        return this.id;
    }

    getProfiles(): Profile[] {
        return this.profiles;
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    getType(): number {
        return this.type;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setProfiles(profiles: Profile[]): void {
        this.profiles = profiles;
    }

    setMaxPlayers(maxPlayers: number): void {
        this.maxPlayers = maxPlayers;
    }

    setType(type: number): void {
        this.type = type;
    }

    addProfile(profile: Profile) {
        if (!this.maxPlayers || this.profiles.length < this.maxPlayers) {
            this.profiles.push(profile);
        }
    }

    validate(leaderboard: { profiles: Profile[]; maxPlayers: number; type: number }) {
        if (!leaderboard.profiles || leaderboard.profiles.length === 0) {
            throw new Error('Rankings must contain at least one player');
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
            this.profiles.length === leaderboard.getProfiles().length
        );
    }

    static from({
        id,
        maxPlayers,
        type,
        profiles,
    }: LeaderboardPrisma & { profiles: ProfilePrisma[] }) {
        return new Leaderboard({
            id,
            maxPlayers,
            type,
            profiles: profiles.map((profile) => Profile.from(profile)),
        });
    }
}
