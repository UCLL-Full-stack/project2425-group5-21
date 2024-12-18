import { Leaderboard } from '../../model/leaderboard';
import leaderboardDb from '../../repository/leaderboard.db';
import leaderboardService from '../../service/leaderboard.service';
import { TypingTest } from '../../model/typingTest';
import { LeaderboardInput, TypingTestInput, UserInput } from '../../types';
import { User } from '../../model/user';

const userInput1: UserInput = {
    username: 'testuser',
    email: 'test.user@example.com',
    password: 'hashedpassword',
    role: 'player',
    creationDate: new Date(),
};

const userInput2: UserInput = {
    username: 'testuser1',
    email: 'test.userr@example.com',
    password: 'hashedpassword1',
    role: 'player',
    creationDate: new Date(),
};

const userInput3: UserInput = {
    username: 'testuser3',
    email: 'test.userrr@example.com',
    password: 'hashedpassword3',
    role: 'player',
    creationDate: new Date(),
};

const user1 = new User({
    ...userInput1,
});

const user2 = new User({
    ...userInput2,
});

const user3 = new User({
    ...userInput3,
});

const typingTestData1: TypingTestInput = {
    wpm: 120,
    accuracy: 98,
    time: 15,
    type: 'singleplayer',
    user: user1,
    gameId: 1,
};

const typingTestData2: TypingTestInput = {
    wpm: 120,
    accuracy: 98,
    time: 30,
    type: 'singleplayer',
    user: user2,
    gameId: 1,
};

const typingTestData3: TypingTestInput = {
    wpm: 120,
    accuracy: 98,
    time: 60,
    type: 'singleplayer',
    user: user3,
    gameId: 1,
};

const typingTest1 = new TypingTest({
    ...typingTestData1,
    user: user1,
    gameId: 1,
});

const typingTest2 = new TypingTest({
    ...typingTestData2,
    user: user2,
    gameId: 1,
});

const typingTest3 = new TypingTest({
    ...typingTestData3,
    user: user3,
    gameId: 1,
});

const leaderboardData1: LeaderboardInput = {
    id: 1,
    maxScores: 5,
    type: 15,
    scores: [typingTest1],
};

const leaderboardData2: LeaderboardInput = {
    id: 1,
    maxScores: 5,
    type: 30,
    scores: [typingTest2],
};

const leaderboardData3: LeaderboardInput = {
    id: 1,
    maxScores: 5,
    type: 60,
    scores: [typingTest3],
};

const leaderboard1 = new Leaderboard({
    ...leaderboardData1,
    scores: [typingTest1],
});

const leaderboard2 = new Leaderboard({
    ...leaderboardData2,
    scores: [typingTest2],
});

const leaderboard3 = new Leaderboard({
    ...leaderboardData3,
    scores: [typingTest3],
});

let mockLeaderboardDbGetAllLeaderboards: jest.Mock;
let mockLeaderboardDbGetLeaderboardByType: jest.Mock;

beforeEach(() => {
    mockLeaderboardDbGetAllLeaderboards = jest.fn();
    mockLeaderboardDbGetLeaderboardByType = jest.fn();

    leaderboardDb.getAllLeaderboards = mockLeaderboardDbGetAllLeaderboards;
    leaderboardDb.getLeaderboardByType = mockLeaderboardDbGetLeaderboardByType;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid values for leaderboard, when: calling getAllLeaderboards, then: all leaderboards are returned', async () => {
    // given
    mockLeaderboardDbGetAllLeaderboards.mockResolvedValue([
        leaderboard1,
        leaderboard2,
        leaderboard3,
    ]);

    // when
    const leaderboards = await leaderboardService.getAllLeaderboards();

    // then
    expect(mockLeaderboardDbGetAllLeaderboards).toHaveBeenCalledTimes(1);
    expect(leaderboards).toEqual([leaderboard1, leaderboard2, leaderboard3]);
});

test('given: valid type, when: calling getLeaderboardByType 15, then: leaderboard is returned', async () => {
    // given
    mockLeaderboardDbGetLeaderboardByType.mockResolvedValue(leaderboard1);

    // when
    const foundLeaderboard = await leaderboardService.getLeaderboardByType(15);

    // then
    expect(mockLeaderboardDbGetLeaderboardByType).toHaveBeenCalledTimes(1);
    expect(mockLeaderboardDbGetLeaderboardByType).toHaveBeenCalledWith({ type: 15 });
    expect(foundLeaderboard).toEqual(leaderboard1);
});

test('given: valid type, when: calling getLeaderboardByType 30, then: leaderboard is returned', async () => {
    // given
    mockLeaderboardDbGetLeaderboardByType.mockResolvedValue(leaderboard2);

    // when
    const foundLeaderboard = await leaderboardService.getLeaderboardByType(30);

    // then
    expect(mockLeaderboardDbGetLeaderboardByType).toHaveBeenCalledTimes(1);
    expect(mockLeaderboardDbGetLeaderboardByType).toHaveBeenCalledWith({ type: 30 });
    expect(foundLeaderboard).toEqual(leaderboard2);
});

test('given: valid type, when: calling getLeaderboardByType 60, then: leaderboard is returned', async () => {
    // given
    mockLeaderboardDbGetLeaderboardByType.mockResolvedValue(leaderboard3);

    // when
    const foundLeaderboard = await leaderboardService.getLeaderboardByType(60);

    // then
    expect(mockLeaderboardDbGetLeaderboardByType).toHaveBeenCalledTimes(1);
    expect(mockLeaderboardDbGetLeaderboardByType).toHaveBeenCalledWith({ type: 60 });
    expect(foundLeaderboard).toEqual(leaderboard3);
});

test('given: invalid type, when: calling getLeaderboardByType, then: an error is thrown', async () => {
    // given
    mockLeaderboardDbGetLeaderboardByType.mockResolvedValue(null);

    // when
    const getLeaderboardByType = async () => await leaderboardService.getLeaderboardByType(999);

    // then
    await expect(getLeaderboardByType).rejects.toThrow(`Leaderboard doesn't exist with type 999.`);
});
