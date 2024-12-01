import { User } from '../model/user';
import { TypingTest } from '../model/typingTest';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return userDB.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    return userDB.getUserById(id);
};

const getTypingTestsByUser = async (userId: number): Promise<TypingTest[]> => {
    return userDB.getTypingTestsByUser(userId);
};

const getTypingTestsByUserAndType = async (userId: number, type: string): Promise<TypingTest[]> => {
    return userDB.getTypingTestsByUserAndType(userId, type);
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

    if (existing) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ username, email, password: hashedPassword, creationDate, role });

    return await userDB.createUser(user);
};

export default {
    getAllUsers,
    getUserById,
    getTypingTestsByUser,
    getTypingTestsByUserAndType,
    createUser,
    getUserByUsername,
    authenticate,
};
