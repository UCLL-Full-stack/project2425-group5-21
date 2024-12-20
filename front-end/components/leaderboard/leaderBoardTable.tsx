import React from "react";
import { useRouter } from "next/router";
import type { Leaderboard } from "@/types";
import { useTranslation } from "next-i18next";

type Props = {
  leaderboard: Leaderboard | null;
};

const LeaderboardTable: React.FC<Props> = ({ leaderboard }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleRowClick = (userId: string) => {
    router.push(`/leaderboards/${userId}`);
  };

  return (
    <div className="w-11/12 max-w-7xl bg-[#2a2d40] rounded-lg shadow-lg overflow-hidden">
      <table className="w-full table-auto text-center text-lg">
        <thead>
          <tr className="bg-[#3b3f5c] text-[#b0b3c8]">
            <th className="py-6 font-semibold uppercase tracking-wider">
              {t("leaderboard.rank")}
            </th>
            <th className="py-6 font-semibold uppercase tracking-wider">
              {t("leaderboard.username")}
            </th>
            <th className="py-6 font-semibold uppercase tracking-wider">WPM</th>
            <th className="py-6 font-semibold uppercase tracking-wider">
              {t("leaderboard.accuracy")}
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard?.scores?.map((score, index) => (
            <tr
              key={score.id}
              className="hover:bg-[#393d56] transition duration-200"
              onClick={() =>
                score.user?.id && handleRowClick(score.user.id.toString())
              }
              role="button"
            >
              <td className="py-6 text-[#8e97f0] font-medium">{index + 1}</td>
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
  );
};

export default LeaderboardTable;
