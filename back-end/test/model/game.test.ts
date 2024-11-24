import { set } from 'date-fns';
import { Game } from '../../model/game';
import { User } from '../../model/user';
import { Role } from '../../types';

const user1 = new User({
    id: 1,
    username: 'JohnDoe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    role: Role.Player,
    creationDate: new Date(),
});

const user2 = new User({
    id: 2,
    username: 'JaneToe',
    email: 'jane.toe@ucll.be',
    password: 'janet123',
    role: Role.Admin,
    creationDate: new Date(),
});

const startDate = set(new Date(), { hours: 8, minutes: 30 });
const endDate = set(new Date(), { hours: 10, minutes: 30 });

test('given: missing start date, when: game is created, then: an error is thrown', () => {
    // given
    // const invalidGame = {
    //     startDate: null as any,
    //     endDate: endDate,
    //     users: [user1, user2],
    // };

    // when
    const game = () =>
        new Game({
            startDate: null,
            endDate: endDate,
            users: [user1, user2],
        });

    // then
    expect(game).toThrow('Start date is require');
});

// test('given: missing end date, when: game is created, then: an error is thrown', () => {
//     // given
//     const invalidGame = {
//         startDate: startDate,
//         endDate: null,
//         users: [user1, user2],
//     };

//     // when
//     const game = () => new Game(invalidGame);

//     // then
//     expect(game).toThrow('End date is required');
// });

// test('given: start date after end date, when: game is created, then: an error is thrown', () => {
//     // given
//     const invalidGame = {
//         startDate: endDate,
//         endDate: startDate,
//         users: [user1, user2],
//     };

//     // when
//     const game = () => new Game(invalidGame);

//     // then
//     expect(game).toThrow('Start date cannot be after end date');
// });

// test('given: no players, when: game is created, then: an error is thrown', () => {
//     // given
//     const invalidGame = {
//         startDate: startDate,
//         endDate: endDate,
//         users: [],
//     };

//     // when
//     const game = () => new Game(invalidGame);

//     // then
//     expect(game).toThrow('At least one player is required');
// });

test('given: valid data, when: game is created, then: game is created successfully', () => {
    // given
    const validGame = {
        startDate: startDate,
        endDate: endDate,
        users: [user1, user2],
    };

    // when
    const game = new Game(validGame);

    // then
    expect(game.getStartDate()).toEqual(startDate);
    expect(game.getEndDate()).toEqual(endDate);
    expect(game.getUsers().length).toBe(2);
    expect(game.getUsers()[0].getUsername()).toBe('JohnDoe');
    expect(game.getUsers()[1].getUsername()).toBe('JaneToe');
});
