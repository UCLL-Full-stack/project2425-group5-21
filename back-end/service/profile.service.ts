import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';
import {ProfileInput} from "../types";

const getAllProfiles = async (): Promise<Profile[]> => {
    return profileDb.getAllProfiles();
};

// const updateProfile = async (id: number, updatedData: ProfileInput): Promise<Profile | null> => {
//     const profile = profileDb.getProfileById(id);
//
//     if (!profile) {
//         throw new Error(`Profile with id ${id} does not exist.`);
//     }
//
//     if (updatedData.username) profile.setUsername(updatedData.username);
//     if (updatedData.bio) profile.setBio(updatedData.bio);
//     if (updatedData.avgWPM !== undefined) profile.setAvgWPM(updatedData.avgWPM);
//     if (updatedData.highestWPM !== undefined) profile.setHighestWPM(updatedData.highestWPM);
//     if (updatedData.startDate) profile.setStartDate(new Date(updatedData.startDate));
//     if (updatedData.role) profile.setRole(updatedData.role);
//
//     profile.updateProfile(updatedData);
//
//     return profile;
// };

const createProfile = async (profileInput: ProfileInput): Promise<Profile> => {
    // Validate input
    if (!profileInput.id) {
        throw new Error('Profile ID is required');
    }
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

    const existingProfile = profileDb.getProfileById(profileInput.id);
    if (existingProfile) {
        throw new Error('Profile with this ID already exists.');
    }

    // Create a new Profile instance
    const newProfile = new Profile(profileInput);
    return profileDb.createProfile(newProfile);
};

export default { getAllProfiles, createProfile };
