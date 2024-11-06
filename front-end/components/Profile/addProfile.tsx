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
        <form onSubmit={handleSubmit} className="bg-[#2a2d40] p-6 rounded-lg shadow-lg text-white w-11/12 max-w-4xl mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="mb-4">
                    <label htmlFor="id" className="block text-[#b0b3c8] font-semibold">ID</label>
                    <input
                        type="number"
                        name="id"
                        value={profileInput.id}
                        onChange={handleChange}
                        required
                        className="bg-[#393d56] border-none rounded-md text-[#d4d7f2] p-2 mt-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-[#b0b3c8] font-semibold">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={profileInput.username}
                        onChange={handleChange}
                        required
                        className="bg-[#393d56] border-none rounded-md text-[#d4d7f2] p-2 mt-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bio" className="block text-[#b0b3c8] font-semibold">Bio</label>
                    <input
                        type="text"
                        name="bio"
                        value={profileInput.bio}
                        onChange={handleChange}
                        required
                        className="bg-[#393d56] border-none rounded-md text-[#d4d7f2] p-2 mt-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="highestWPM" className="block text-[#b0b3c8] font-semibold">Highest WPM</label>
                    <input
                        type="number"
                        name="highestWPM"
                        value={profileInput.highestWPM}
                        onChange={handleChange}
                        required
                        className="bg-[#393d56] border-none rounded-md text-[#d4d7f2] p-2 mt-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="avgWPM" className="block text-[#b0b3c8] font-semibold">Average WPM</label>
                    <input
                        type="number"
                        name="avgWPM"
                        value={profileInput.avgWPM}
                        onChange={handleChange}
                        required
                        className="bg-[#393d56] border-none rounded-md text-[#d4d7f2] p-2 mt-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-[#b0b3c8] font-semibold">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={profileInput.startDate}
                        onChange={handleChange}
                        required
                        className="bg-[#393d56] border-none rounded-md text-[#d4d7f2] p-2 mt-1 w-full"
                    />
                </div>
                <div className="mb-4 col-span-1 sm:col-span-2 lg:col-span-1">
                    <label htmlFor="role" className="block text-[#b0b3c8] font-semibold">Role</label>
                    <select 
                        name="role" 
                        value={profileInput.role} 
                        onChange={handleChange} 
                        className="bg-[#393d56] border-none rounded-md text-[#d4d7f2] p-2 mt-1 w-full"
                    >
                        <option value="player">Player</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
            <button 
                type="submit" 
                className="bg-[#5ac4d7] mr-2 text-[#1a1d2e] py-2 px-6 rounded-lg font-semibold mt-4 hover:bg-[#49a8b8] transition duration-200"
            >
                Add Profile
            </button>
            <button
                type="button"
                onClick={() => onProfileAdded()}
                className="bg-red-500 text-[#1a1d2e] py-2 px-6 rounded-lg font-semibold mt-4 hover:bg-red-600 transition duration-200"
            >
                Cancel    
            </button>
        </form>
    );
};

export default AddProfileForm;
