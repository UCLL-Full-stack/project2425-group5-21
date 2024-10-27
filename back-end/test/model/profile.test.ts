import { set } from 'date-fns';
import { Profile } from '../../model/profile';
import { ProfileInput } from '../../types';

// start date

const startDate = set(new Date(), { hours: 8, minutes: 30 });

test('given: missing username, when: profile is created, then: an error is thrown', () => {
    // given

    const invalidProfile: ProfileInput = {
        id: 1,
        username: '',
        bio: 'I love to program and to type fast.',
        avgWPM: 122.34,
        highestWPM: 145.56,
        startDate: startDate,
        role: 'player',
    };

    // when
    const profile = () => new Profile(invalidProfile);

    // then
    expect(profile).toThrow('Username is required');
});

test('given: missing bio, when: profile is created, then: an error is thrown', () => {
    // given

    const invalidProfile: ProfileInput = {
        id: 1,
        username: 'johndoe',
        bio: '',
        avgWPM: 122.34,
        highestWPM: 145.56,
        startDate: startDate,
        role: 'player',
    };

    // when
    const profile = () => new Profile(invalidProfile);

    // then
    expect(profile).toThrow('Bio is required');
});

test('given: negative avgWPM, when: profile is created, then: an error is thrown', () => {
    // given

    const invalidProfile: ProfileInput = {
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: -1,
        highestWPM: 145.56,
        startDate: startDate,
        role: 'player',
    };

    // when
    const profile = () => new Profile(invalidProfile);

    // then
    expect(profile).toThrow('Average WPM must be positive');
});

test('given: missing avgWPM, when: profile is created, then: an error is thrown', () => {
    // given

    const invalidProfile: ProfileInput = {
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: null,
        highestWPM: 145.56,
        startDate: startDate,
        role: 'player',
    };

    // when
    const profile = () => new Profile(invalidProfile);

    // then
    expect(profile).toThrow('Average WPM is required');
});

test('given: negative highestWPM, when: profile is created, then: an error is thrown', () => {
    // given

    const invalidProfile: ProfileInput = {
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 120.23,
        highestWPM: -1,
        startDate: startDate,
        role: 'player',
    };

    // when
    const profile = () => new Profile(invalidProfile);

    // then
    expect(profile).toThrow('Highest WPM must be positive');
});

test('given: missing highestWPM, when: profile is created, then: an error is thrown', () => {
    // given

    const invalidProfile: ProfileInput = {
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 120.56,
        highestWPM: null,
        startDate: startDate,
        role: 'player',
    };

    // when
    const profile = () => new Profile(invalidProfile);

    // then
    expect(profile).toThrow('Highest WPM is required');
});

test('given: missing role, when: profile is created, then: an error is thrown', () => {
    // given

    const invalidProfile: ProfileInput = {
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 122.34,
        highestWPM: 145.56,
        startDate: startDate,
        role: null,
    };

    // when
    const profile = () => new Profile(invalidProfile);

    // then
    expect(profile).toThrow('Role is required');
});

test('given: missing start date, when: profile is created, then: an error is thrown', () => {
    // given

    const invalidProfile: ProfileInput = {
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 122.34,
        highestWPM: 145.56,
        startDate: null,
        role: 'player',
    };

    // when
    const profile = () => new Profile(invalidProfile);

    // then
    expect(profile).toThrow('Start date is required');
});

test('given: valid values for profile, when: profile is created, then: profile is created with those values', () => {
    // given

    const validProfile: ProfileInput = {
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 122.34,
        highestWPM: 145.56,
        startDate: startDate,
        role: 'player',
    };

    // when
    const profile = new Profile(validProfile);

    // then
    expect(profile.getUsername()).toEqual(validProfile.username);
    expect(profile.getBio()).toEqual(validProfile.bio);
    expect(profile.getAvgWPM()).toEqual(validProfile.avgWPM);
    expect(profile.getHighestWPM()).toEqual(validProfile.highestWPM);
    expect(profile.getStartDate()).toEqual(validProfile.startDate);
    expect(profile.getRole()).toBe(validProfile.role);
});
