import { Challenge } from '../model/challenge';

const challenges = [
    new Challenge({
        id: 1,
        name: 'Code Challenge 1',
        description: 'Solve easy coding puzzles',
        difficulty: 'easy',
    }),
    new Challenge({
        id: 2,
        name: 'Code Challenge 2',
        description: 'Solve medium coding puzzles',
        difficulty: 'medium',
    }),
    new Challenge({
        id: 3,
        name: 'Code Challenge 3',
        description: 'Solve hard coding puzzles',
        difficulty: 'hard',
    }),
];

const getAllChallenges = (): Challenge[] => {
    return challenges;
};

export default {
    getAllChallenges,
};