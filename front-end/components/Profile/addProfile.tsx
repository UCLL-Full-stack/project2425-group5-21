import React, { useState } from "react";
import profileService from "@/services/ProfileService";

type Role = "player" | "admin";

interface ProfileInput {
    id: string;
    username: string;
    bio: string;
    avgWPM: string;
    highestWPM: string;
    startDate: string;
    role: Role;
}

const AddProfileForm: React.FC<{ onProfileAdded: () => void }> = ({ onProfileAdded }) => {
    const [profileInput, setProfileInput] = useState<ProfileInput>({
        id: '',
        username: '',
        bio: "",
        avgWPM: '',
        highestWPM: '',
        startDate: "",
        role: 'player',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await profileService.addProfile({
                id: Number(profileInput.id),
                username: profileInput.username.trim(),
                bio: profileInput.bio.trim(),
                avgWPM: Number(profileInput.avgWPM),
                highestWPM: Number(profileInput.highestWPM),
                startDate: new Date(profileInput.startDate).toISOString(),
                role: profileInput.role as Role,
            });
            onProfileAdded();
        } catch (error) {
            console.error("Error adding profile:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                <div className="mb-2">
                    <label htmlFor="id" className="block text-gray-400">ID</label>
                    <input
                        type="number"
                        name="id"
                        value={profileInput.id}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-400">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={profileInput.username}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bio" className="block text-gray-400">Bio</label>
                    <input
                        type="text"
                        name="bio"
                        value={profileInput.bio}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="highestWPM" className="block text-gray-400">Highest WPM</label>
                    <input
                        type="number"
                        name="highestWPM"
                        value={profileInput.highestWPM}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="avgWPM" className="block text-gray-400">Average WPM</label>
                    <input
                        type="number"
                        name="avgWPM"
                        value={profileInput.avgWPM}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-gray-400">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={profileInput.startDate}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="mb-4 col-span-2">
                    <label htmlFor="role" className="block text-gray-400">Role</label>
                    <select name="role" value={profileInput.role} onChange={handleChange} className="input">
                        <option value="player">Player</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded mt-4">Add Profile</button>
        </form>
    );
};

export default AddProfileForm;
