enum Role {
    Player = 'player',
    Admin = 'admin',
}
type UserInput = {
    id?: number;
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
    avgWPM: number;
    highestWPM: number;
    startDate: Date;
    role: Role;
};

export { Role, UserInput, ProfileInput };
