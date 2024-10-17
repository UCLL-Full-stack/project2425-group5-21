export class Profile {
    private id?: number;
    private bio: string;
    private avgWPM: number;
    private startDate: Date;
    private role: string;

    constructor(profile: {
        id?: number;
        bio: string;
        avgWPM: number;
        startDate: Date;
        role: string;
    }) {
        this.validate(profile);

        this.id = profile.id;
        this.bio = profile.bio;
        this.avgWPM = profile.avgWPM;
        this.startDate = profile.startDate;
        this.role = profile.role;
    }

    getId(): number | undefined {
        return this.id;
    }

    getBio(): string {
        return this.bio;
    }

    getAvgWPM(): number {
        return this.avgWPM;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getRole(): string {
        return this.role;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setBio(bio: string): void {
        this.bio = bio;
    }

    setAvgWPM(avgWPM: number): void {
        this.avgWPM = avgWPM;
    }

    setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    setRole(role: string): void {
        this.role = role;
    }

    validate(profile: { bio: string; avgWPM: number; startDate: Date; role: string }) {
        if (!profile.bio?.trim()) {
            throw new Error('Bio is required');
        }
        if (!profile.avgWPM) {
            throw new Error('Average WPM is required');
        }
        if (!profile.startDate) {
            throw new Error('Start date is required');
        }
        if (!profile.role?.trim()) {
            throw new Error('Role is required');
        }
    }

    equals(profile: Profile): boolean {
        return (
            this.bio === profile.getBio() &&
            this.avgWPM === profile.getAvgWPM() &&
            this.startDate === profile.getStartDate() &&
            this.role === profile.getRole()
        );
    }
}
