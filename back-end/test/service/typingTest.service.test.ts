import { TypingTest } from '../../model/typingTest';
import typingtestDb from '../../repository/typingtest.db';
import typingtestService from '../../service/typingtest.service';
import { TypingTestInput } from '../../types';

jest.mock('../../repository/typingtest.db');

const typingTestInput: TypingTestInput = {
    wpm: 120,
    accuracy: 98,
    time: 15,
    type: 'singleplayer',
    userId: 1,
    gameId: 1,
};

const typingTest = new TypingTest({
    ...typingTestInput,
});

let mockTypingtestDbGetAllTypingTests: jest.Mock;
let mockTypingtestDbGetTypingTestsByUsername: jest.Mock;

beforeEach(() => {
    mockTypingtestDbGetAllTypingTests = jest.fn();
    mockTypingtestDbGetTypingTestsByUsername = jest.fn();

    typingtestDb.getAllTypingTests = mockTypingtestDbGetAllTypingTests;
    typingtestDb.getTypingTestsByUsername = mockTypingtestDbGetTypingTestsByUsername;
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
    await expect(getTypingTest).rejects.toThrow('You are not authorized to access this resource.');
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
