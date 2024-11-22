// import {ProfileInput} from "../../types";
// import {Profile} from "../../model/profile";
// import profileDb from "../../repository/profile.db";
// import profileService from "../../service/profile.service";

// const profileInput: ProfileInput = {
//     id: 1,
//     username: 'johndoe',
//     bio: 'I love to program and to type fast.',
//     avgWPM: 122.34,
//     highestWPM: 140.34,
//     startDate: new Date(2024, 10, 2),
//     role: 'player',
// };

// const profile = new Profile({
//     ...profileInput,
// });

// let createProfileMock: jest.Mock;
// let mockProfileDbGetProfileById: jest.Mock;

// beforeEach(() => {
//     createProfileMock = jest.fn();
//     mockProfileDbGetProfileById = jest.fn();

//     profileDb.getProfileById = mockProfileDbGetProfileById;
//     profileDb.createProfile = createProfileMock;
// });

// afterEach(() => {
//     jest.clearAllMocks();
// });

// test('given a valid profile, when createProfile is called, then profile is created with the correct values', async () => {

//     // given
//     mockProfileDbGetProfileById.mockReturnValue(null);
//     createProfileMock.mockResolvedValue(profile);

//     // when
//     await profileService.createProfile(profileInput);

//     // then
//     expect(createProfileMock).toHaveBeenCalledTimes(1);
//     expect(createProfileMock).toHaveBeenCalledWith(expect.objectContaining(profileInput));
// });

// test('given a profile with an existing ID, when createProfile is called, then an error is thrown', async () => {
//     // given
//     mockProfileDbGetProfileById.mockReturnValue(profile);

//     // when
//     const createProfileWithExistingId = () => profileService.createProfile(profileInput);

//     // then
//     await expect(createProfileWithExistingId()).rejects.toThrow('Profile with this ID already exists.');
// });
