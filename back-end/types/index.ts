type Role = 'admin' | 'player';

type UserInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role | null;
};

type ProfileInput = {
    id?: number;
    username: string;
    bio: string;
    avgWPM: number | null;
    highestWPM: number | null;
    startDate: Date | null;
    role: Role | null;
};

export { Role, UserInput, ProfileInput };
