import { Tournament } from '../model/tournament';
import tournamentDb from '../repository/tournament.db';

const getAllTournaments = async (): Promise<Tournament[]> => {
    return tournamentDb.getAllTournaments();
};

export default { getAllTournaments };
