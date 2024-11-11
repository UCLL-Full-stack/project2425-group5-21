import { Role as PrismaRole, Profile as ProfilePrisma } from '@prisma/client';

export class Profile {
    private id?: number;
    private username: string;
    private bio: string;
    private avgWPM: number;
    private highestWPM: number;
    private startDate: Date;
    private role: PrismaRole;

    constructor(profile: {
        id?: number;
        username: string;
        bio: string;
        avgWPM: number;
        highestWPM: number;
        startDate: Date;
        role: PrismaRole;
    }) {
        this.validate(profile);

        this.id = profile.id;
        this.username = profile.username;
        this.bio = profile.bio;
        this.avgWPM = profile.avgWPM;
        this.highestWPM = profile.highestWPM;
        this.startDate = profile.startDate;
        this.role = profile.role;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getBio(): string {
        return this.bio;
    }

    getAvgWPM(): number {
        return this.avgWPM;
    }

    getHighestWPM(): number {
        return this.highestWPM;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getRole(): PrismaRole {
        return this.role;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    setBio(bio: string): void {
        this.bio = bio;
    }

    setAvgWPM(avgWPM: number): void {
        this.avgWPM = avgWPM;
    }

    setHighestWPM(highestWPM: number): void {
        this.highestWPM = highestWPM;
    }

    setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    setRole(role: PrismaRole): void {
        this.role = role;
    }

    validate(profile: {
        username: string;
        bio: string;
        avgWPM: number;
        highestWPM: number;
        startDate: Date;
        role: PrismaRole;
    }) {
        if (!profile.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!profile.bio?.trim()) {
            throw new Error('Bio is required');
        }
        if (profile.avgWPM === null || profile.avgWPM === undefined) {
            throw new Error('Average WPM is required');
        }
        if (profile.avgWPM < 0) {
            throw new Error('Average WPM must be positive');
        }
        if (profile.highestWPM === null || profile.highestWPM === undefined) {
            throw new Error('Highest WPM is required');
        }
        if (profile.highestWPM < 0) {
            throw new Error('Highest WPM must be positive');
        }
        if (!profile.startDate) {
            throw new Error('Start date is required');
        }
        if (!profile.role) {
            throw new Error('Role is required');
        }
    }

    equals(profile: Profile): boolean {
        return (
            this.username === profile.getUsername() &&
            this.bio === profile.getBio() &&
            this.avgWPM === profile.getAvgWPM() &&
            this.highestWPM === profile.getHighestWPM() &&
            this.startDate === profile.getStartDate() &&
            this.role === profile.getRole()
        );
    }

    static from({ id, username, bio, avgWPM, highestWPM, startDate, role }: ProfilePrisma) {
        return new Profile({
            id,
            username,
            bio,
            avgWPM: avgWPM ?? 0,
            highestWPM: highestWPM ?? 0,
            startDate: startDate ?? 0,
            role,
        });
    }

    toPrisma() {
        return {
            username: this.username,
            bio: this.bio,
            avgWPM: this.avgWPM,
            highestWPM: this.highestWPM,
            startDate: this.startDate,
            role: this.role,
        };
    }
}
