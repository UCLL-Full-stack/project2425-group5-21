import { Challenge } from '../model/challenge';
import challengeDb from '../repository/challenge.db';

const getAllChallenges = async (): Promise<Challenge[]> => {
    return challengeDb.getAllChallenges();
};

export default { getAllChallenges };
