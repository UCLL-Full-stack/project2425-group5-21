import { set } from 'date-fns';
import { Game } from '../../model/game';
import { User } from '../../model/user';

const user1 = new User({
    id: 1,
    username: 'JohnDoe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    role: 'player',
    creationDate: new Date(),
});

const user2 = new User({
    id: 2,
    username: 'JaneToe',
    email: 'jane.toe@ucll.be',
    password: 'janet123',
    role: 'player',
    creationDate: new Date(),
});

const startDate = set(new Date(), { hours: 8, minutes: 30 });
const endDate = set(new Date(), { hours: 10, minutes: 30 });

const createGame = (overrides = {}) =>
    new Game({ startDate, endDate, users: [user1, user2], ...overrides });

test('given: valid data, when: game is created, then: game is created successfully', () => {
    const validGame = createGame();

    expect(validGame.getStartDate()).toEqual(startDate);
    expect(validGame.getEndDate()).toEqual(endDate);
    expect(validGame.getUsers().length).toBe(2);
    expect(validGame.getUsers()[0].getUsername()).toBe('JohnDoe');
    expect(validGame.getUsers()[1].getUsername()).toBe('JaneToe');
});

test('given: missing start date, when: game is created, then: an error is thrown', () => {
    expect(() => createGame({ startDate: null })).toThrow('Start date is required');
});

test('given: missing end date, when: game is created, then: an error is thrown', () => {
    expect(() => createGame({ endDate: null })).toThrow('End date is required');
});

test('given: start date after end date, when: game is created, then: an error is thrown', () => {
    expect(() => createGame({ startDate: endDate, endDate: startDate })).toThrow(
        'Start date cannot be after end date'
    );
});

test('given: no players, when: game is created, then: an error is thrown', () => {
    expect(() => createGame({ users: [] })).toThrow('At least one player is required');
});
