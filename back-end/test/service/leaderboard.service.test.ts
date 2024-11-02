import {ProfileInput, Role} from "../../types";
import {set} from "date-fns";
import {Profile} from "../../model/profile";
import leaderboardService from "../../service/leaderboard.service";
import {Leaderboard} from "../../model/leaderboard";

const startDate = set(new Date(), { hours: 8, minutes: 30 });

const profileInput: ProfileInput = {
    id: 1,
    username: 'johndoe',
    bio: 'I love to program and to type fast.',
    avgWPM: 122.34,
    highestWPM: 140.34,
    startDate: startDate,
    role: 'player',
};

const profile = new Profile({
    ...profileInput,
});

let mockLeaderboardDBGetAllLeaderboards: jest.Mock;

beforeEach(() => {
    mockLeaderboardDBGetAllLeaderboards = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given leaderboards in database, when getAllLeaderboards, then all leaderboards are returned', async () => {
    // given


    // when


    // then


});