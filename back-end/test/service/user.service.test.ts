import { User } from '../../model/user';
import userDB from '../../repository/user.db';
import typingtestDb from '../../repository/typingtest.db';
import gameDb from '../../repository/game.db';
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

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserByUsername: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockUserDbDeleteUser: jest.Mock;
let mockTypingtestDbDeleteTypingTestsByUserId: jest.Mock;
let mockGameDbRemoveGamesByUserId: jest.Mock;
let mockUserDbUpdateUsername: jest.Mock;
let mockBcryptCompare: jest.Mock;
let mockBcryptHash: jest.Mock;
let mockGenerateJwtToken: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserByUsername = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
    mockUserDbCreateUser = jest.fn();
    mockUserDbDeleteUser = jest.fn();
    mockTypingtestDbDeleteTypingTestsByUserId = jest.fn();
    mockGameDbRemoveGamesByUserId = jest.fn();
    mockUserDbUpdateUsername = jest.fn();
    mockBcryptCompare = jest.fn();
    mockBcryptHash = jest.fn();
    mockGenerateJwtToken = jest.fn();

    userDB.getAllUsers = mockUserDbGetAllUsers;
    userDB.getUserByUsername = mockUserDbGetUserByUsername;
    userDB.getUserById = mockUserDbGetUserById;
    userDB.getUserByEmail = mockUserDbGetUserByEmail;
    userDB.createUser = mockUserDbCreateUser;
    userDB.deleteUser = mockUserDbDeleteUser;
    typingtestDb.deleteTypingTestsByUserId = mockTypingtestDbDeleteTypingTestsByUserId;
    gameDb.removeGamesByUserId = mockGameDbRemoveGamesByUserId;
    userDB.updateUsername = mockUserDbUpdateUsername;
    bcrypt.compare = mockBcryptCompare;
    bcrypt.hash = mockBcryptHash;
    jest.spyOn(jwtUtil, 'generateJwtToken').mockImplementation(mockGenerateJwtToken);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: calling getAllUsers, then: all users are returned', async () => {
    // given
    mockUserDbGetAllUsers.mockResolvedValue([user]);

    // when
    const users = await userService.getAllUsers();

    // then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(users).toEqual([user]);
});

test('given: valid userId, when: calling getUserById, then: user is returned', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);

    // when
    const foundUser = await userService.getUserById(1);

    // then
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
    expect(foundUser).toEqual(user);
});

test('given: invalid userId, when: calling getUserById, then: null is returned', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(null);

    // when
    const call = userService.getUserById(999);

    // then
    await expect(call).rejects.toThrow('User with ID 999 does not exist.');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(999);
});

test('given: valid username, when: calling getUserByUsername, then: user is returned', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(user);

    // when
    const foundUser = await userService.getUserByUsername({ username: 'johndoe' });

    // then
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
    expect(foundUser).toEqual(user);
});

test('given: invalid username, when: calling getUserByUsername, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(null);

    // when
    const call = userService.getUserByUsername({ username: 'invaliduser' });

    // then
    await expect(call).rejects.toThrow('User with username: invaliduser does not exist.');
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: 'invaliduser' });
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

test('given: valid userId, when: calling deleteUser, then: user is deleted', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);

    // when
    await userService.deleteUser(1);

    // then
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
    expect(mockTypingtestDbDeleteTypingTestsByUserId).toHaveBeenCalledTimes(1);
    expect(mockTypingtestDbDeleteTypingTestsByUserId).toHaveBeenCalledWith(1);
    expect(mockGameDbRemoveGamesByUserId).toHaveBeenCalledTimes(1);
    expect(mockGameDbRemoveGamesByUserId).toHaveBeenCalledWith(1);
    expect(mockUserDbDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbDeleteUser).toHaveBeenCalledWith(1);
});

test('given: invalid userId, when: calling deleteUser, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(null);

    // when
    const call = userService.deleteUser(999);

    // then
    await expect(call).rejects.toThrow('User with ID 999 does not exist.');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(999);
});

test('given: valid userId and new username, when: calling updateUsername, then: username is updated', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);
    mockUserDbGetUserByUsername.mockResolvedValue(null);

    // when
    await userService.updateUsername(1, 'newusername');

    // then
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: 'newusername' });
    expect(mockUserDbUpdateUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbUpdateUsername).toHaveBeenCalledWith(1, 'newusername');
});

test('given: invalid userId, when: calling updateUsername, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(null);

    // when
    const call = userService.updateUsername(999, 'newusername');

    // then
    await expect(call).rejects.toThrow('User with ID 999 does not exist.');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(999);
});

test('given: same username, when: calling updateUsername, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);

    // when
    const call = userService.updateUsername(1, 'johndoe');

    // then
    await expect(call).rejects.toThrow(
        'New username johndoe cannot be the same as the current username.'
    );
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
});

test('given: existing username, when: calling updateUsername, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);
    mockUserDbGetUserByUsername.mockResolvedValue(user);

    // when
    const call = userService.updateUsername(1, 'existingusername');

    // then
    await expect(call).rejects.toThrow('Username existingusername is already taken.');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: 'existingusername' });
});
