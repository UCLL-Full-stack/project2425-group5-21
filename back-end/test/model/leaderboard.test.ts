import { Leaderboard } from '../../model/leaderboard';
import { TypingTest } from '../../model/typingTest';
import { User } from '../../model/user';

const typingTestData = {
    wpm: 120,
    accuracy: 98,
    time: 15,
    type: 'singleplayer',
    user: {
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'hashedpassword',
        role: 'player',
        creationDate: new Date(),
    },
    gameId: 1,
};

const typingTest = new TypingTest(typingTestData);

const leaderboardData = {
    maxScores: 10,
    type: 30,
    scores: [typingTest],
};

let leaderboard: Leaderboard;

beforeEach(() => {
    leaderboard = new Leaderboard(leaderboardData);
});

const { maxScores, type, scores } = leaderboardData;

const createLeaderboard = (overrides = {}) => new Leaderboard({ ...leaderboardData, ...overrides });

test('given: valid values for leaderboard, when: leaderboard is created, then: leaderboard is created with those values.', () => {
    expect(leaderboard.getMaxScores()).toEqual(maxScores);
    expect(leaderboard.getType()).toEqual(type);
    expect(leaderboard.getScores()).toEqual(scores);
});

test('given: missing scores, when: leaderboard is created, then: an error is thrown.', () => {
    expect(() => createLeaderboard({ scores: [] })).toThrow(
        'Scores must contain at least one typing test'
    );
});

test('given: missing maxScores, when: leaderboard is created, then: an error is thrown.', () => {
    expect(() => createLeaderboard({ maxScores: undefined })).toThrow(
        'Max players must be a positive integer'
    );
});

test('given: maxScores equal to 0, when: leaderboard is created, then: an error is thrown.', () => {
    expect(() => createLeaderboard({ maxScores: -1 })).toThrow(
        'Max players must be a positive integer'
    );
});

test('given: maxScores less than 0, when: leaderboard is created, then: an error is thrown.', () => {
    expect(() => createLeaderboard({ maxScores: -1 })).toThrow(
        'Max players must be a positive integer'
    );
});

test('given: missing type, when: leaderboard is created, then: an error is thrown.', () => {
    expect(() => createLeaderboard({ type: undefined })).toThrow('Type is required');
});

test('given: invalid type, when: leaderboard is created, then: an error is thrown.', () => {
    expect(() => createLeaderboard({ type: 45 })).toThrow('Type must be either 15, 30, or 60');
});
