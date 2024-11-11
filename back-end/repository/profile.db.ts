import { Profile } from '../model/profile';
import database from './database';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany();
        return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProfileById = async (id: number): Promise<Profile | null> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: { id },
        });
        return profilePrisma ? Profile.from(profilePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createProfile = async (profile: Profile): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.create({
            data: profile.toPrisma(),
        });
        return Profile.from(profilePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const clearProfiles = async (): Promise<void> => {
    try {
        await database.profile.deleteMany({});
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllProfiles,
    getProfileById,
    createProfile,
    clearProfiles,
};
