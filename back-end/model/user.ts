import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly creationDate: Date;
    readonly role: Role;

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        creationDate: Date;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.creationDate = user.creationDate;
        this.role = user.role;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }

    getRole(): Role {
        return this.role;
    }

    validate(user: {
        username: string;
        email: string;
        password: string;
        creationDate: Date;
        role: Role;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.creationDate) {
            throw new Error('Creation date is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.creationDate === user.getCreationDate() &&
            this.role === user.getRole()
        );
    }

    static from({ id, username, email, password, creationDate, role }: UserPrisma): User {
        return new User({
            id,
            username,
            email,
            password,
            creationDate,
            role: role as Role,
        });
    }
}
