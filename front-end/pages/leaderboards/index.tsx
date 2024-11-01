import React, { useEffect, useState } from "react";
import { Leaderboard as LeaderboardType } from "@/types";
import LeaderboardService from "@/services/LeaderboardService";
import Head from "next/head";
import Header from "@/components/header";

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
    const [error, setError] = useState<string | null>(null);

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

                    {leaderboard.map((lb) => (
                        <div
                            key={lb.id}
                            className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 transition duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Leaderboard Type: {lb.type}</h2>
                                <p className="text-gray-400">Max Players: {lb.maxPlayers}</p>
                            </div>
                            <table className="w-full table-auto border-collapse text-center">
                                <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-4 py-3 font-semibold uppercase text-sm border-b border-gray-600">
                                        Rank
                                    </th>
                                    <th className="px-4 py-3 font-semibold uppercase text-sm border-b border-gray-600">
                                        Username
                                    </th>
                                    <th className="px-4 py-3 font-semibold uppercase text-sm border-b border-gray-600">
                                        Highest WPM
                                    </th>
                                    <th className="px-4 py-3 font-semibold uppercase text-sm border-b border-gray-600">
                                        Role
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {lb.rankings.map((player, index) => (
                                    player ? (
                                        <tr key={player.id} className="bg-gray-800 hover:bg-gray-700 transition duration-150">
                                            <td className="px-4 py-4 border-b border-gray-600">{index + 1}</td>
                                            <td className="px-4 py-4 border-b border-gray-600 font-bold">
                                                {player.username}
                                            </td>
                                            <td className="px-4 py-4 border-b border-gray-600">{player.highestWPM}</td>
                                            <td className="px-4 py-4 border-b border-gray-600">{player.role}</td>
                                        </tr>
                                    ) : (
                                        <tr key={index} className="bg-gray-700">
                                            <td className="px-4 py-4 border-b border-gray-600">{index + 1}</td>
                                            <td className="px-4 py-4 border-b border-gray-600 text-gray-500">Slot Empty</td>
                                        </tr>
                                    )
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Leaderboard;
