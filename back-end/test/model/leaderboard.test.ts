import { Leaderboard } from '../../model/leaderboard';
import { User } from '../../model/user';
import { Role, UserInput } from '../../types';

// users

const userInput1: UserInput = {
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    role: 'player',
};

const userInput2: UserInput = {
    username: 'janetoe',
    firstName: 'Jane',
    lastName: 'Toe',
    email: 'jane.toe@ucll.be',
    password: 'janet123',
    role: 'admin',
};

const user1 = new User({
    ...userInput1,
});

const user2 = new User({
    ...userInput2,
});

test('given: 0 max players, when: leaderboard is created, then: an error is thrown', () => {
    // given
    const invalidLeaderboard = {
        rankings: [user1, user2],
        maxPlayers: 0,
        type: 15,
    };

    // when
    const leaderboard = () => new Leaderboard(invalidLeaderboard);

    // then
    expect(leaderboard).toThrow('Max players must be greater than 0');
});

test('given: no rankings, when: leaderboard is created, then: an error is thrown', () => {
    // given
    const invalidLeaderboard = {
        rankings: [],
        maxPlayers: 2,
        type: 15,
    };

    // when
    const leaderboard = () => new Leaderboard(invalidLeaderboard);

    // then
    expect(leaderboard).toThrow('Rankings must contain at least one player');
});

test('given: null type, when: leaderboard is created, then: an error is thrown', () => {
    // given
    const invalidLeaderboard = {
        rankings: [user1, user2],
        maxPlayers: 2,
        type: null,
    };

    // when
    const leaderboard = () => new Leaderboard(invalidLeaderboard);

    // then
    expect(leaderboard).toThrow('Type is required');
});

test('given: a type not 15, 30 or 60, when: leaderboard is created, then: an error is thrown', () => {
    // given
    const invalidLeaderboard = {
        rankings: [user1, user2],
        maxPlayers: 2,
        type: 90,
    };

    // when
    const leaderboard = () => new Leaderboard(invalidLeaderboard);

    // then
    expect(leaderboard).toThrow('Type must only be 15, 30, or 60');
});

test('given: valid values for leaderboard, when: leaderboard is created, then: leaderboard is created with those values', () => {
    // given
    const validLeaderboard = {
        rankings: [user1, user2],
        maxPlayers: 2,
        type: 15,
    };

    // when
    const leaderboard = new Leaderboard(validLeaderboard);

    // then
    expect(leaderboard.getRankings()).toEqual(validLeaderboard.rankings);
    expect(leaderboard.getMaxPlayers()).toEqual(validLeaderboard.maxPlayers);
});
