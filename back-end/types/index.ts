export enum Role {
    Player = 'player',
    Admin = 'admin',
}

export type UserInput = {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    creationDate?: Date;
    role?: Role;
};

export type TypingTestInput = {
    id?: number;
    wpm?: number;
    accuracy?: number;
    time?: number;
    type?: string;
    userId?: number;
    gameId?: number;
};

export type LeaderboardInput = {
    id?: number;
    maxPlayers?: number;
    type?: number;
    scores?: TypingTestInput[];
};

export type GameInput = {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    users?: UserInput[];
};
