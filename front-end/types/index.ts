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
    type: string;
    maxPlayers: number;
    rankings: (Player | null)[];
};