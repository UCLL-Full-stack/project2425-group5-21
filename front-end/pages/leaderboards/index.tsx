import React, { useEffect, useState } from "react";
import { Leaderboard as LeaderboardType } from "@/types";
import LeaderboardService from "@/services/LeaderboardService";
import Head from "next/head";
import Header from "@/components/header";
import AddProfileForm from "@/components/Profile/addProfile";

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const getLeaderboards = async () => {
        setError(null);
        try {
            const response = await LeaderboardService.getAllLeaderboards();
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const leaderboards = await response.json();
            setLeaderboard(leaderboards);
        } catch (err: any) {
            setError(err.message || "Failed to fetch leaderboard data");
        }
    };

    useEffect(() => {
        getLeaderboards();
    }, []);

    const handleProfileAdded = async () => {
        await getLeaderboards();
        setModalOpen(false);
    };

    return (
        <>
            <Head>
                <title>Leaderboard</title>
            </Head>
            <Header />
            <main>
                <div className="p-8 bg-gray-900 min-h-screen text-gray-100">
                    <h1 className="text-4xl font-extrabold text-center mb-8 tracking-widest">
                        🏆 Leaderboard 🏆
                    </h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <button onClick={() => setModalOpen(true)} className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
                        Add Profile
                    </button>
                    {isModalOpen && <AddProfileForm onProfileAdded={handleProfileAdded} />}
                    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
                        <table className="w-full table-auto border-collapse text-center">
                            <thead>
                            <tr className="bg-gray-700">
                                <th className="px-4 py-3 font-semibold uppercase text-sm border-b border-gray-600">Rank</th>
                                <th className="px-4 py-3 font-semibold uppercase text-sm border-b border-gray-600">Username</th>
                                <th className="px-4 py-3 font-semibold uppercase text-sm border-b border-gray-600">Highest WPM</th>
                                <th className="px-4 py-3 font-semibold uppercase text-sm border-b border-gray-600">Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {leaderboard[0]?.rankings?.map((player) => (
                                player ? (
                                    <tr key={player.id} className="bg-gray-800 hover:bg-gray-700 transition duration-150">
                                        <td className="px-4 py-4 border-b border-gray-600">{leaderboard[0].rankings.indexOf(player) + 1}</td>
                                        <td className="px-4 py-4 border-b border-gray-600 font-bold">{player.username}</td>
                                        <td className="px-4 py-4 border-b border-gray-600">{player.highestWPM}</td>
                                        <td className="px-4 py-4 border-b border-gray-600">{player.role}</td>
                                    </tr>
                                ) : null
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Leaderboard;
