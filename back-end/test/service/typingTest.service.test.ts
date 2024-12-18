import { TypingTest } from '../../model/typingTest';
import { User } from '../../model/user';
import typingtestDb from '../../repository/typingtest.db';
import userDb from '../../repository/user.db';
import typingtestService from '../../service/typingtest.service';
import { TypingTestInput } from '../../types';
import { UserInput } from '../../types';

jest.mock('../../repository/typingtest.db');

const userInput: UserInput = {
    username: 'testuser',
    email: 'test.user@example.com',
    password: 'hashedpassword',
    role: 'player',
    creationDate: new Date(),
};

const user = new User({
    ...userInput,
});

const typingTestInput: TypingTestInput = {
    wpm: 120,
    accuracy: 98,
    time: 15,
    type: 'singleplayer',
    user: userInput,
    gameId: 1,
};

const typingTest = new TypingTest({
    ...typingTestInput,
    user: user,
    gameId: 1,
});

let mockTypingtestDbGetAllTypingTests: jest.Mock;
let mockTypingtestDbGetTypingTestsByUsername: jest.Mock;
let mockTypingtestDbGetTypingTestsByUserId: jest.Mock;
let mockTypingtestDbGetTypingTestsByUserIdAndType: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    mockTypingtestDbGetAllTypingTests = jest.fn();
    mockTypingtestDbGetTypingTestsByUsername = jest.fn();
    mockTypingtestDbGetTypingTestsByUserId = jest.fn();
    mockTypingtestDbGetTypingTestsByUserIdAndType = jest.fn();
    mockUserDbGetUserById = jest.fn();

    typingtestDb.getAllTypingTests = mockTypingtestDbGetAllTypingTests;
    typingtestDb.getTypingTestsByUsername = mockTypingtestDbGetTypingTestsByUsername;
    typingtestDb.getTypingTestsByUser = mockTypingtestDbGetTypingTestsByUserId;
    typingtestDb.getTypingTestsByUserAndType = mockTypingtestDbGetTypingTestsByUserIdAndType;
    userDb.getUserById = mockUserDbGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: admin role, when: calling getTypingTest, then: all typing tests are returned', async () => {
    // given
    mockTypingtestDbGetAllTypingTests.mockResolvedValue([typingTest]);

    // when
    const typingTests = await typingtestService.getTypingTest({ username: 'admin', role: 'admin' });

    // then
    expect(mockTypingtestDbGetAllTypingTests).toHaveBeenCalledTimes(1);
    expect(typingTests).toEqual([typingTest]);
});

test('given: moderator role, when: calling getTypingTest, then: all typing tests are returned', async () => {
    // given
    mockTypingtestDbGetAllTypingTests.mockResolvedValue([typingTest]);

    // when
    const typingTests = await typingtestService.getTypingTest({
        username: 'moderator',
        role: 'moderator',
    });

    // then
    expect(mockTypingtestDbGetAllTypingTests).toHaveBeenCalledTimes(1);
    expect(typingTests).toEqual([typingTest]);
});

test('given: player role, when: calling getTypingTest, then: typing tests for the player are returned', async () => {
    // given
    mockTypingtestDbGetTypingTestsByUsername.mockResolvedValue([typingTest]);

    // when
    const typingTests = await typingtestService.getTypingTest({
        username: 'johndoe',
        role: 'player',
    });

    // then
    expect(mockTypingtestDbGetTypingTestsByUsername).toHaveBeenCalledTimes(1);
    expect(mockTypingtestDbGetTypingTestsByUsername).toHaveBeenCalledWith('johndoe');
    expect(typingTests).toEqual([typingTest]);
});

test('given: unauthorized role, when: calling getTypingTest, then: an error is thrown', async () => {
    // when
    const getTypingTest = async () =>
        await typingtestService.getTypingTest({ username: 'guest', role: 'guest' });

    // then
    await expect(getTypingTest).rejects.toThrow(
        'Wrong credentials, You are not authorized to access this resource.'
    );
});

test('given: calling getAllTypingTests, then: all typing tests are returned', async () => {
    // given
    mockTypingtestDbGetAllTypingTests.mockResolvedValue([typingTest]);

    // when
    const typingTests = await typingtestService.getAllTypingTests();

    // then
    expect(mockTypingtestDbGetAllTypingTests).toHaveBeenCalledTimes(1);
    expect(typingTests).toEqual([typingTest]);
});

test('given: valid userId, when: calling getTypingTestsByUser, then: typing tests for the user are returned', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);
    mockTypingtestDbGetTypingTestsByUserId.mockResolvedValue([typingTest]);

    // when
    const typingTests = await typingtestService.getTypingTestsByUser(1);

    // then
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
    expect(mockTypingtestDbGetTypingTestsByUserId).toHaveBeenCalledTimes(1);
    expect(mockTypingtestDbGetTypingTestsByUserId).toHaveBeenCalledWith(1);
    expect(typingTests).toEqual([typingTest]);
});

test('given: invalid userId, when: calling getTypingTestsByUser, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(null);

    // when
    const call = typingtestService.getTypingTestsByUser(999);

    // then
    await expect(call).rejects.toThrow('User with ID 999 does not exist.');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(999);
});

test('given: valid userId and type: singeplayer, when: calling getTypingTestsByUserAndType, then: typing tests for the user and type: singeplayer are returned', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);
    mockTypingtestDbGetTypingTestsByUserIdAndType.mockResolvedValue([typingTest]);

    // when
    const typingTests = await typingtestService.getTypingTestsByUserAndType(1, 'singleplayer');

    // then
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
    expect(mockTypingtestDbGetTypingTestsByUserIdAndType).toHaveBeenCalledTimes(1);
    expect(mockTypingtestDbGetTypingTestsByUserIdAndType).toHaveBeenCalledWith(1, 'singleplayer');
    expect(typingTests).toEqual([typingTest]);
});

test('given: valid userId and type: multiplayer, when: calling getTypingTestsByUserAndType, then: typing tests for the user and type: multiplayer are returned', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);
    mockTypingtestDbGetTypingTestsByUserIdAndType.mockResolvedValue([typingTest]);

    // when
    const typingTests = await typingtestService.getTypingTestsByUserAndType(1, 'multiplayer');

    // then
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
    expect(mockTypingtestDbGetTypingTestsByUserIdAndType).toHaveBeenCalledTimes(1);
    expect(mockTypingtestDbGetTypingTestsByUserIdAndType).toHaveBeenCalledWith(1, 'multiplayer');
    expect(typingTests).toEqual([typingTest]);
});

test('given: invalid userId, when: calling getTypingTestsByUserAndType, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(null);

    // when
    const call = typingtestService.getTypingTestsByUserAndType(999, 'singleplayer');

    // then
    await expect(call).rejects.toThrow('User with ID 999 does not exist.');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(999);
});

test('given: invalid type, when: calling getTypingTestsByUserAndType, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserById.mockResolvedValue(user);

    // when
    const call = typingtestService.getTypingTestsByUserAndType(1, 'invalidtype');

    // then
    await expect(call).rejects.toThrow(
        'Invalid type. Type must be either singleplayer or multiplayer.'
    );
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
});
