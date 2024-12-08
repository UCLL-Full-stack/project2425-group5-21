import { User } from '../model/user';
import { TypingTest } from '../model/typingTest';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import typingtestDb from '../repository/typingtest.db';
import leaderboardDb from '../repository/leaderboard.db';
import gameDb from '../repository/game.db';

const getAllUsers = async (): Promise<User[]> => {
    return userDB.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    const user = await userDB.getUserById(id);
    if (!user) {
        throw new Error(`User with ID ${id} does not exist.`);
    }
    return userDB.getUserById(id);
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDB.getUserByUsername({ username });

    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }

    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username,
        role: user.getRole(),
    };
};

const createUser = async ({
    username,
    password,
    email,
    creationDate,
    role,
}: UserInput): Promise<User> => {
    const existing = await userDB.getUserByUsername({ username });
    const existingEmail = await userDB.getUserByEmail({ email });

    if (existing) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    if (existingEmail) {
        throw new Error(`User with email ${email} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ username, email, password: hashedPassword, creationDate, role });

    return await userDB.createUser(user);
};

const deleteUser = async (userId: number): Promise<void> => {
    const user = await userDB.getUserById(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} does not exist.`);
    }

    await typingtestDb.deleteTypingTestsByUserId(userId);
    await gameDb.removeGamesByUserId(userId);
    await userDB.deleteUser(userId);
};

const updateUsername = async (userId: number, newUsername: string): Promise<void> => {
    const user = await userDB.getUserById(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} does not exist.`);
    }

    const existingUser = await userDB.getUserByUsername({ username: newUsername });
    if (existingUser) {
        throw new Error(`Username ${newUsername} is already taken.`);
    }

    await userDB.updateUsername(userId, newUsername);
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    getUserByUsername,
    authenticate,
    deleteUser,
    updateUsername,
};
