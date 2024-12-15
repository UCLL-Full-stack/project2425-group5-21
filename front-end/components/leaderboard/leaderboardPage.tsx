import { useState, useEffect } from "react";
import LeaderboardService from "@/services/LeaderboardService";
import LeaderboardTable from "@/components/leaderboard/leaderBoardTable";
import LeaderboardTypes from "@/components/leaderboard/leaderboardTypes";
import type { Leaderboard } from "@/types";

const LeaderboardPage: React.FC = () => {
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
      <main className="h-screen bg-[#120e17] flex flex-col items-center text-white relative pt-10">
        {isAuthenticated ? (
          <>
            <LeaderboardTypes
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <LeaderboardTable leaderboard={leaderboard} />
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

export default LeaderboardPage;
