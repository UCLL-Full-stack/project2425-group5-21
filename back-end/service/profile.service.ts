import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';
import { ProfileInput } from '../types';

const getAllProfiles = async (): Promise<Profile[]> => {
    return profileDb.getAllProfiles();
};

const createProfile = async (profileInput: ProfileInput): Promise<Profile> => {
    if (!profileInput.username) {
        throw new Error('Username is required');
    }
    if (!profileInput.bio) {
        throw new Error('Bio is required');
    }
    if (profileInput.avgWPM === undefined) {
        throw new Error('AvgWPM is required');
    }
    if (profileInput.highestWPM === undefined) {
        throw new Error('HighestWPM is required');
    }
    if (!profileInput.startDate) {
        throw new Error('Start date is required');
    }
    if (!profileInput.role) {
        throw new Error('Role is required');
    }

    const newProfile = new Profile(profileInput);
    return profileDb.createProfile(newProfile);
};

export default { getAllProfiles, createProfile };
