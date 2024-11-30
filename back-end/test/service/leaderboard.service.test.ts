import { Leaderboard } from '../../model/leaderboard';
import leaderboardDb from '../../repository/leaderboard.db';
import leaderboardService from '../../service/leaderboard.service';
import { TypingTest } from '../../model/typingTest';

jest.mock('../../repository/leaderboard.db');

const typingTestData1 = {
    wpm: 120,
    accuracy: 98,
    time: 15,
    type: 'singleplayer',
    userId: 1,
    gameId: 1,
};

const typingTestData2 = {
    wpm: 120,
    accuracy: 98,
    time: 30,
    type: 'singleplayer',
    userId: 1,
    gameId: 1,
};

const typingTestData3 = {
    wpm: 120,
    accuracy: 98,
    time: 60,
    type: 'singleplayer',
    userId: 1,
    gameId: 1,
};

const typingTest1 = new TypingTest({
    ...typingTestData1,
});

const typingTest2 = new TypingTest({
    ...typingTestData2,
});

const typingTest3 = new TypingTest({
    ...typingTestData3,
});

const leaderboardData1 = {
    id: 1,
    maxScores: 10,
    type: 15,
    scores: [typingTest1],
};

const leaderboardData2 = {
    id: 1,
    maxScores: 10,
    type: 30,
    scores: [typingTest2],
};

const leaderboardData3 = {
    id: 1,
    maxScores: 10,
    type: 60,
    scores: [typingTest3],
};

const leaderboard1 = new Leaderboard({
    ...leaderboardData1,
});

const leaderboard2 = new Leaderboard({
    ...leaderboardData2,
});

const leaderboard3 = new Leaderboard({
    ...leaderboardData3,
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
