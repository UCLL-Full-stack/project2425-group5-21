import { set } from 'date-fns';
import { Game } from '../../model/game';
import { User } from '../../model/user';
import { Role } from '../../types';

const user1 = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    role: Role.Player,
});

const user2 = new User({
    firstName: 'Jane',
    lastName: 'Toe',
    email: 'jane.toe@ucll.be',
    password: 'janet123',
    role: Role.Admin,
});

const startDate = set(new Date(), { hours: 8, minutes: 30 });
const endDate = set(new Date(), { hours: 10, minutes: 30 });

test('given: missing start date, when: game is created, then: an error is thrown', () => {
    // given
    const invalidGame = {
        startDate: null,
        endDate: endDate,
        players: [user1, user2],
        status: 'active',
    };

    // when
    const game = () => new Game(invalidGame);

    // then
    expect(game).toThrow('Start date is required');
});

test('given: missing end date, when: game is created, then: an error is thrown', () => {
    // given
    const invalidGame = {
        startDate: startDate,
        endDate: null,
        players: [user1, user2],
        status: 'active',
    };

    // when
    const game = () => new Game(invalidGame);

    // then
    expect(game).toThrow('End date is required');
});

test('given: start date is after end date, when: game is created, then: an error is thrown', () => {
    // given
    const invalidGame = {
        startDate: startDate,
        endDate: set(new Date(), { hours: 7, minutes: 30 }),
        players: [user1, user2],
        status: 'active',
    };

    // when
    const game = () => new Game(invalidGame);

    // then
    expect(game).toThrow('Start date cannot be after end date');
});

test('given: no players, when: game is created, then: an error is thrown', () => {
    // given
    const invalidGame = {
        startDate: startDate,
        endDate: endDate,
        players: [],
        status: 'active',
    };

    // when
    const game = () => new Game(invalidGame);

    // then
    expect(game).toThrow('At least one player is required');
});

test('given: missing status, when: game is created, then: an error is thrown', () => {
    // given
    const invalidGame = {
        startDate: startDate,
        endDate: endDate,
        players: [user1, user2],
        status: '',
    };

    // when
    const game = () => new Game(invalidGame);

    // then
    expect(game).toThrow('Status is required');
});

test('given: valid values for game, when: game is created, then: game is created with those values', () => {
    // given
    const validGame = {
        startDate: startDate,
        endDate: endDate,
        players: [user1, user2],
        status: 'active',
    };

    // when
    const game = new Game(validGame);

    // then
    expect(game.getStartDate()).toEqual(validGame.startDate);
    expect(game.getEndDate()).toEqual(validGame.endDate);
    expect(game.getPlayers()).toEqual(validGame.players);
    expect(game.getStatus()).toBe(validGame.status);
});
