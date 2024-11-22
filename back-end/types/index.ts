export enum Role {
    Player = 'player',
    Admin = 'admin',
}
export type UserInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
    creationDate: Date;
    role: Role | null;
};
