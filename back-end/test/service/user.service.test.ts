import { User } from '../../model/user';
import { TypingTest } from '../../model/typingTest';
import userDB from '../../repository/user.db';
import userService from '../../service/user.service';
import { AuthenticationResponse, UserInput } from '../../types';
import bcrypt from 'bcrypt';
import * as jwtUtil from '../../util/jwt';

jest.mock('../../repository/user.db');
jest.mock('bcrypt');
jest.mock('../../util/jwt');

const userInput: UserInput = {
    username: 'johndoe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    creationDate: new Date(),
    role: 'player',
};

const user = new User({
    ...userInput,
    password: 'hashedpassword',
});

let mockUserDbGetUserByUsername: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockBcryptCompare: jest.Mock;
let mockBcryptHash: jest.Mock;
let mockGenerateJwtToken: jest.Mock;

beforeEach(() => {
    mockUserDbGetUserByUsername = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
    mockUserDbCreateUser = jest.fn();
    mockBcryptCompare = jest.fn();
    mockBcryptHash = jest.fn();
    mockGenerateJwtToken = jest.fn();

    userDB.getUserByUsername = mockUserDbGetUserByUsername;
    userDB.getUserByEmail = mockUserDbGetUserByEmail;
    userDB.createUser = mockUserDbCreateUser;
    bcrypt.compare = mockBcryptCompare;
    bcrypt.hash = mockBcryptHash;
    jest.spyOn(jwtUtil, 'generateJwtToken').mockImplementation(mockGenerateJwtToken);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid user, when: calling createUser, then: user is created with those values', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(null);
    mockBcryptHash.mockResolvedValue('hashedpassword');
    mockUserDbCreateUser.mockResolvedValue(user);

    // when
    const createdUser = await userService.createUser(userInput);

    // then
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: userInput.username });
    expect(mockBcryptHash).toHaveBeenCalledTimes(1);
    expect(mockBcryptHash).toHaveBeenCalledWith(userInput.password, 12);
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(expect.any(User));
    expect(createdUser).toEqual(user);
});

test('given an existing username, when user is created, then an error is thrown', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(user);

    // when
    const createUser = async () => await userService.createUser(userInput);

    // then
    await expect(createUser).rejects.toThrow(
        `User with username ${userInput.username} is already registered.`
    );
});

test('given an existing email, when user is created, then an error is thrown', async () => {
    // given
    mockUserDbGetUserByEmail.mockResolvedValue(user);

    // when
    const createUser = async () => await userService.createUser(userInput);

    // then
    await expect(createUser).rejects.toThrow(
        `User with email ${userInput.email} is already registered.`
    );
});

test('given valid credentials, when user is authenticated, then a token is returned', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(user);
    mockBcryptCompare.mockResolvedValue(true);
    mockGenerateJwtToken.mockReturnValue('token');

    // when
    const response: AuthenticationResponse = await userService.authenticate(userInput);

    // then
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: userInput.username });
    expect(mockBcryptCompare).toHaveBeenCalledTimes(1);
    expect(mockBcryptCompare).toHaveBeenCalledWith(userInput.password, user.password);
    expect(mockGenerateJwtToken).toHaveBeenCalledTimes(1);
    expect(mockGenerateJwtToken).toHaveBeenCalledWith({
        username: userInput.username,
        role: user.role,
    });
    expect(response).toEqual({
        token: 'token',
        username: userInput.username,
        role: user.role,
    });
});

test('given invalid credentials, when user is authenticated, then an error is thrown', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(user);
    mockBcryptCompare.mockResolvedValue(false);

    // when
    const authenticate = async () => await userService.authenticate(userInput);

    // then
    await expect(authenticate).rejects.toThrow('Incorrect password.');
});

test('given non-existing user, when user is authenticated, then an error is thrown', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(null);

    // when
    const authenticate = async () => await userService.authenticate(userInput);

    // then
    await expect(authenticate).rejects.toThrow(
        `User with username: ${userInput.username} does not exist.`
    );
});
