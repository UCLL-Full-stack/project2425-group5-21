import { set } from 'date-fns';
import { Game } from '../../model/game';
import gameDb from '../../repository/game.db';
import gameService from '../../service/game.service';
import { User } from '../../model/user';
import { UserInput, GameInput } from '../../types';

jest.mock('../../repository/game.db');

const userInput1: UserInput = {
    username: 'janedoe',
    email: 'jane.doe@ucll.be',
    password: 'janed123',
    creationDate: new Date(),
    role: 'player',
};

const user1 = new User({
    ...userInput1,
    password: 'hashedpassword',
});

const userInput2: UserInput = {
    username: 'johndoe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    creationDate: new Date(),
    role: 'player',
};

const user2 = new User({
    ...userInput2,
    password: 'hashedpassword',
});

const startDate = set(new Date(), { hours: 10, minutes: 30 });
const endDate = set(new Date(), { hours: 10, minutes: 32 });

const gameInput: GameInput = {
    startDate,
    endDate,
    users: [userInput1, userInput2],
};

const game = new Game({
    ...gameInput,
    users: [user1, user2],
    id: 1,
});

let mockGameDbGetAllGamesWithUsers: jest.Mock;
let mockGameDbGetGameByIdWithUsers: jest.Mock;

beforeEach(() => {
    mockGameDbGetAllGamesWithUsers = jest.fn();
    mockGameDbGetGameByIdWithUsers = jest.fn();

    gameDb.getAllGamesWithUsers = mockGameDbGetAllGamesWithUsers;
    gameDb.getGameByIdWithUsers = mockGameDbGetGameByIdWithUsers;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid values for game, when: calling getAllGamesWithUsers, then: all games with users are returned', async () => {
    // given
    mockGameDbGetAllGamesWithUsers.mockResolvedValue([game]);

    // when
    const games = await gameService.getAllGamesWithUsers();

    // then
    expect(mockGameDbGetAllGamesWithUsers).toHaveBeenCalledTimes(1);
    expect(games).toEqual([game]);
});

test('given: valid gameId, when: calling getGameByIdWithUsers, then: game with users is returned', async () => {
    // given
    mockGameDbGetGameByIdWithUsers.mockResolvedValue(game);

    // when
    const foundGame = await gameService.getGameByIdWithUsers(1);

    // then
    expect(mockGameDbGetGameByIdWithUsers).toHaveBeenCalledTimes(1);
    expect(mockGameDbGetGameByIdWithUsers).toHaveBeenCalledWith(1);
    expect(foundGame).toEqual(game);
});

test('given: invalid gameId, when: calling getGameByIdWithUsers, then: an error is thrown', async () => {
    // given
    mockGameDbGetGameByIdWithUsers.mockResolvedValue(null);

    // when
    const call = gameService.getGameByIdWithUsers(999);

    // then
    await expect(call).rejects.toThrow('Game with ID 999 does not exist.');
    expect(mockGameDbGetGameByIdWithUsers).toHaveBeenCalledTimes(1);
    expect(mockGameDbGetGameByIdWithUsers).toHaveBeenCalledWith(999);
});
