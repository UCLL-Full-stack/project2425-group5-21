import { Leaderboard } from '../../model/leaderboard';
import {Profile} from "../../model/profile";
import {set} from "date-fns";

// date

const startDate = set(new Date(), { hours: 8, minutes: 30 });

// users

const profile1 = new Profile({
    id: 1,
    username: 'johndoe',
    bio: 'I love to program and to type fast.',
    avgWPM: 122.34,
    highestWPM: 140.34,
    startDate: startDate,
    role: 'player',
});

const profile2 = new Profile({
    id: 2,
    username: 'janedoe',
    bio: 'I enjoy solving puzzles and achieving high typing speeds.',
    avgWPM: 98,
    highestWPM: 120.34,
    startDate: startDate,
    role: 'player',
});

test('given: 0 max players, when: leaderboard is created, then: an error is thrown', () => {
    // given
    const invalidLeaderboard = {
        rankings: [profile1, profile2],
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
        rankings: [profile1, profile2],
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
        rankings: [profile1, profile2],
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
        rankings: [profile1, profile2],
        maxPlayers: 2,
        type: 15,
    };

    // when
    const leaderboard = new Leaderboard(validLeaderboard);

    // then
    expect(leaderboard.getRankings()).toEqual(validLeaderboard.rankings);
    expect(leaderboard.getMaxPlayers()).toEqual(validLeaderboard.maxPlayers);
    expect(leaderboard.getType()).toEqual(validLeaderboard.type);
});
