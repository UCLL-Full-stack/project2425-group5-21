type Role = 'admin' | 'player';

export type Player = {
    id: number;
    username: string;
    bio: string;
    avgWPM: number;
    highestWPM: number;
    role: string;
};

export type Leaderboard = {
    id: number;
    maxPlayers: number;
    rankings: (Player | null)[];
};

export type Profile = {
    id?: number;
    username: string;
    bio: string;
    avgWPM: number | null;
    highestWPM: number | null;
    startDate: Date | null;
    role: Role | null;
};