import { set } from 'date-fns';
import { Tournament } from '../../model/tournament';
import { TypingTest } from '../../model/typingTest';

const startDate = set(new Date(), { hours: 8, minutes: 30 });
const endDate = set(new Date(), { hours: 10, minutes: 30 });

test('given: missing name, when: tournament is created, then: an error is thrown', () => {
    // given
    const invalidTournament = {
        name: '',
        startDate: startDate,
        endDate: endDate,
        difficulity: 'medium',
    };

    // when
    const tournament = () => new Tournament(invalidTournament);

    // then
    expect(tournament).toThrow('Name is required');
});

test('given: missing start date, when: tournament is created, then: an error is thrown', () => {
    // given
    const invalidTournament = {
        name: 'Progamming java quiz',
        startDate: null,
        endDate: endDate,
        difficulity: 'medium',
    };

    // when
    const tournament = () => new Tournament(invalidTournament);

    // then
    expect(tournament).toThrow('Start date is required');
});

test('given: missing end date, when: tournament is created, then: an error is thrown', () => {
    // given
    const invalidTournament = {
        name: 'Progamming java quiz',
        startDate: startDate,
        endDate: null,
        difficulity: 'medium',
    };

    // when
    const tournament = () => new Tournament(invalidTournament);

    // then
    expect(tournament).toThrow('End date is required');
});

test('given: start date is after end date, when: tournament is created, then: an error is thrown', () => {
    // given
    const invalidTournament = {
        name: 'Progamming java quiz',
        startDate: startDate,
        endDate: set(new Date(), { hours: 7, minutes: 30 }),
        difficulity: 'medium',
    };

    // when
    const tournament = () => new Tournament(invalidTournament);

    // then
    expect(tournament).toThrow('Start date cannot be after end date');
});

test('given: missing difficulity, when: tournament is created, then: an error is thrown', () => {
    // given
    const invalidTournament = {
        name: 'Progamming java quiz',
        startDate: startDate,
        endDate: endDate,
        difficulity: '',
    };

    // when
    const tournament = () => new Tournament(invalidTournament);

    // then
    expect(tournament).toThrow('Difficulity is required');
});

test('given: valid values for tournament, when: tournament is created, then: tournament is created with those values', () => {
    // given
    const validTournament = {
        name: 'Progamming java quiz',
        startDate: startDate,
        endDate: endDate,
        difficulity: 'hard',
    };

    // when
    const tournament = new Tournament(validTournament);

    // then
    expect(tournament.getName()).toBe(validTournament.name);
    expect(tournament.getStartDate()).toBe(validTournament.startDate);
    expect(tournament.getEndDate()).toBe(validTournament.endDate);
    expect(tournament.getDifficulity()).toBe(validTournament.difficulity);
});
