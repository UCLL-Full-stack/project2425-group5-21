import { Challenge } from '../../model/challenge';

test('given: missing name, when: challenge is created, then: an error is thrown', () => {
    // given
    const invalidChallenge = {
        name: '',
        description: 'Solve coding puzzles',
        difficulty: 'medium',
    };

    // when
    const challenge = () => new Challenge(invalidChallenge);

    // then
    expect(challenge).toThrow('Challenge name is required');
});

test('given: missing description, when: challenge is created, then: an error is thrown', () => {
    // given
    const invalidChallenge = {
        name: 'Code Challenge',
        description: '',
        difficulty: 'medium',
    };

    // when
    const challenge = () => new Challenge(invalidChallenge);

    // then
    expect(challenge).toThrow('Description is required');
});

test('given: missing difficulty, when: challenge is created, then: an error is thrown', () => {
    // given
    const invalidChallenge = {
        name: 'Code Challenge',
        description: 'Solve coding puzzles',
        difficulty: '',
    };

    // when
    const challenge = () => new Challenge(invalidChallenge);

    // then
    expect(challenge).toThrow('Difficulty is required');
});

test('given: valid values for challenge, when: challenge is created, then: challenge is created with those values', () => {
    // given

    const validChallenge = {
        name: 'Code Challenge',
        description: 'Solve coding puzzles',
        difficulty: 'medium',
    };

    // when

    const challenge = new Challenge(validChallenge);

    // then

    expect(challenge.getName()).toBe(validChallenge.name);
    expect(challenge.getDescription()).toBe(validChallenge.description);
    expect(challenge.getDifficulty()).toBe(validChallenge.difficulty);
});
