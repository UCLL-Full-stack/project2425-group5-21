import { Role } from '../types';

export class Profile {
    private id?: number;
    private username: string;
    private bio: string;
    private avgWPM: number | null;
    private startDate: Date | null;
    private role: Role | null;

    constructor(profile: {
        id?: number;
        username: string;
        bio: string;
        avgWPM: number | null;
        startDate: Date | null;
        role: Role | null;
    }) {
        this.validate(profile);

        this.id = profile.id;
        this.username = profile.username;
        this.bio = profile.bio;
        this.avgWPM = profile.avgWPM;
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

    getAvgWPM(): number | null {
        return this.avgWPM;
    }

    getStartDate(): Date | null {
        return this.startDate;
    }

    getRole(): Role | null {
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

    setAvgWPM(avgWPM: number | null): void {
        this.avgWPM = avgWPM;
    }

    setStartDate(startDate: Date | null): void {
        this.startDate = startDate;
    }

    setRole(role: Role | null): void {
        this.role = role;
    }

    validate(profile: {
        username: string;
        bio: string;
        avgWPM: number | null;
        startDate: Date | null;
        role: Role | null;
    }) {
        if (!profile.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!profile.bio?.trim()) {
            throw new Error('Bio is required');
        }
        if (!profile.avgWPM) {
            throw new Error('Average WPM is required');
        }
        if (profile.avgWPM < 0) {
            throw new Error('Average WPM must be positive');
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
            this.startDate === profile.getStartDate() &&
            this.role === profile.getRole()
        );
    }
}
