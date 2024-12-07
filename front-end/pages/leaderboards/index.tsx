import Head from "next/head";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import LeaderboardService from "@/services/LeaderboardService";
import type { Leaderboard } from "@/types";

const Leaderboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<number>(15);

  const getLeaderboardByType = async (type: number) => {
    setError(null);
    try {
      const response = await LeaderboardService.getLeaderboardByType(type);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.status}: ${errorData.message}`);
      }
      const leaderboard = await response.json();
      setLeaderboard(leaderboard);
    } catch (err: any) {
      setError(err.message || "Failed to fetch leaderboard data");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setError(
        "You are not authorized to view the leaderboard page. Please login first."
      );
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getLeaderboardByType(selectedType);
    }
  }, [selectedType, isAuthenticated]);

  return (
    <>
      <Head>
        <title>Leaderboard</title>
      </Head>
      <Header />
      <main className="h-screen bg-[#120e17] flex flex-col items-center text-white relative pt-10">
        {isAuthenticated ? (
          <>
            <div className="flex h-30 items-center justify-between w-11/12 max-w-3xl mt-20">
              <h1 className="text-4xl font-extrabold tracking-widest my-8 text-white">
                Leaderboard
              </h1>
              <h1
                onClick={() => setSelectedType(15)}
                className={`text-3xl font-extrabold tracking-widest my-8 cursor-pointer ${
                  selectedType === 15 ? "text-[#49a8b8]" : "text-white"
                }`}
              >
                15
              </h1>
              <h1
                onClick={() => setSelectedType(30)}
                className={`text-3xl font-extrabold tracking-widest my-8 cursor-pointer ${
                  selectedType === 30 ? "text-[#49a8b8]" : "text-white"
                }`}
              >
                30
              </h1>
              <h1
                onClick={() => setSelectedType(60)}
                className={`text-3xl font-extrabold tracking-widest my-8 cursor-pointer ${
                  selectedType === 60 ? "text-[#49a8b8]" : "text-white"
                }`}
              >
                60
              </h1>
            </div>
            <div className="w-11/12 max-w-7xl bg-[#2a2d40] rounded-lg shadow-lg overflow-hidden">
              <table className="w-full table-auto text-center text-lg">
                <thead>
                  <tr className="bg-[#3b3f5c] text-[#b0b3c8]">
                    <th className="py-6 font-semibold uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="py-6 font-semibold uppercase tracking-wider">
                      Username
                    </th>
                    <th className="py-6 font-semibold uppercase tracking-wider">
                      WPM
                    </th>
                    <th className="py-6 font-semibold uppercase tracking-wider">
                      Accuracy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard?.scores?.map((score, index) => (
                    <tr
                      key={score.id}
                      className="hover:bg-[#393d56] transition duration-200"
                    >
                      <td className="py-6 text-[#8e97f0] font-medium">
                        {index + 1}
                      </td>
                      <td className="py-6 font-semibold text-[#d4d7f2]">
                        {score.user?.username}
                      </td>
                      <td className="py-6 font-semibold text-[#d4d7f2]">
                        {score.wpm} wpm
                      </td>
                      <td className="py-6 font-semibold text-[#d4d7f2]">
                        {score.accuracy}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>
            {error && (
              <div className="text-red-400 mt-80 text-2xl">{error}</div>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Leaderboard;
