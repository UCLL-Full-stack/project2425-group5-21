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
    highestWPM: number | null;
    role: Role | null;
};