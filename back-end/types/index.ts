export type Role = 'player' | 'admin' | 'guest';

export type UserInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
    creationDate: Date;
    role: string;
};

export type TypingTestInput = {
    id?: number;
    wpm: number;
    accuracy: number;
    time: number;
    type: string;
    user: UserInput;
    gameId?: number;
};

export type LeaderboardInput = {
    id?: number;
    maxPlayers: number;
    type: number;
    scores: TypingTestInput[];
};

export type GameInput = {
    id?: number;
    startDate: Date;
    endDate: Date;
    users: UserInput[];
};

export type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
};
