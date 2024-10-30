import React from "react";

interface Player {
  id: number;
  username: string;
  bio: string;
  avgWPM: number;
  highestWPM: number;
  role: string;
}

interface LeaderboardData {
  id: number;
  type: string;
  maxPlayers: number;
  rankings: (Player | null)[];
}

interface LeaderboardProps {
  leaderboardData: LeaderboardData[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardData }) => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-widest">
        🏆 Leaderboard 🏆
      </h1>
      {leaderboardData.map((leaderboard) => (
        <div
          key={leaderboard.id}
          className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 transition duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Leaderboard Type: {leaderboard.type}
            </h2>
            <p className="text-gray-400">
              Max Players: {leaderboard.maxPlayers}
            </p>
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
              {leaderboard.rankings.map((player, index) =>
                player ? (
                  <tr
                    key={player.id}
                    className="bg-gray-800 hover:bg-gray-700 transition duration-150"
                  >
                    <td className="px-4 py-4 border-b border-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 border-b border-gray-600 font-bold">
                      {player.username}
                    </td>
                    <td className="px-4 py-4 border-b border-gray-600">
                      {player.highestWPM}
                    </td>
                    <td className="px-4 py-4 border-b border-gray-600">
                      {player.role}
                    </td>
                  </tr>
                ) : (
                  <tr key={index} className="bg-gray-700">
                    <td className="px-4 py-4 border-b border-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 border-b border-gray-600 text-gray-500">
                      Slot Empty
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

// Fetch data from the backend server at request time
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/leaderboards");
  const leaderboardData = await res.json();

  return {
    props: {
      leaderboardData,
    },
  };
}

export default Leaderboard;
