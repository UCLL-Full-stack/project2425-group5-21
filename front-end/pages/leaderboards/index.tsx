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
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const getLeaderboards = async (type?: number) => {
    setError(null);
    try {
      const response = await (type
        ? LeaderboardService.getLeaderboardByType(type)
        : LeaderboardService.getAllLeaderboards());
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const leaderboards = await response.json();
      setLeaderboard(type ? [leaderboards] : leaderboards);
    } catch (err: any) {
      setError(err.message || "Failed to fetch leaderboard data");
    }
  };
  useEffect(() => {
    if (selectedType) {
      getLeaderboards(selectedType);
    } else {
      getLeaderboards();
    }
  }, [selectedType]);

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
      <main className="h-screen bg-[#120e17] flex flex-col  items-center text-white">
        <div className="flex h-20 items-center justify-between w-11/12 max-w-4xl mt-10">
          <h1 className="text-4xl font-extrabold tracking-widest my-8 text-white">
            Leaderboard
          </h1>
          <h1
            onClick={() => setSelectedType(15)}
            className={`text-2xl font-extrabold tracking-widest my-8 cursor-pointer ${
              selectedType === 15 ? "text-[#49a8b8]" : "text-white"
            }`}
          >
            15
          </h1>
          <h1
            onClick={() => setSelectedType(30)}
            className={`text-2xl font-extrabold tracking-widest my-8 cursor-pointer ${
              selectedType === 30 ? "text-[#49a8b8]" : "text-white"
            }`}
          >
            30
          </h1>
          <h1
            onClick={() => setSelectedType(60)}
            className={`text-2xl font-extrabold tracking-widest my-8 cursor-pointer ${
              selectedType === 60 ? "text-[#49a8b8]" : "text-white"
            }`}
          >
            60
          </h1>

          {error && <p className="text-red-400">{error}</p>}

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#5ac4d7] text-[#1a1d2e] py-2 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-[#49a8b8] transition duration-200"
          >
            Add Profile
          </button>
        </div>

        {isModalOpen && <AddProfileForm onProfileAdded={handleProfileAdded} />}

        <div className="w-11/12 max-w-4xl bg-[#2a2d40] rounded-lg shadow-lg overflow-hidden">
          <table className="w-full table-auto text-center text-lg">
            <thead>
              <tr className="bg-[#3b3f5c] text-[#b0b3c8]">
                <th className="py-4 font-semibold uppercase tracking-wider">
                  Rank
                </th>
                <th className="py-4 font-semibold uppercase tracking-wider">
                  Username
                </th>
                <th className="py-4 font-semibold uppercase tracking-wider">
                  Highest WPM
                </th>
                <th className="py-4 font-semibold uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard[0]?.rankings?.map((player, index) =>
                player ? (
                  <tr
                    key={player.id}
                    className="hover:bg-[#393d56] transition duration-200"
                  >
                    <td className="py-4 text-[#8e97f0] font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 font-semibold text-[#d4d7f2]">
                      {player.username}
                    </td>
                    <td className="py-4 text-[#49a8b8] font-bold">
                      {player.highestWPM}
                    </td>
                    <td className="py-4 text-[#b0b3c8]">{player.role}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Leaderboard;
