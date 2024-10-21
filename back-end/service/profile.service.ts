import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';

const getAllProfiles = async (): Promise<Profile[]> => {
    return profileDb.getAllProfiles();
};

export default { getAllProfiles };
