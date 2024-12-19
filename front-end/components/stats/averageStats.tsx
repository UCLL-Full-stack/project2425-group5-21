import { useState, useEffect } from "react";
import { TypingTest, User } from "@/types";
import TypingTestService from "@/services/TypingTestService";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const AverageStats: React.FC<{ typingTests: TypingTest[] }> = ({ typingTests }) => {
  const { t } = useTranslation("common");

  const calculateAverages = (time: number) => {
    const filteredTests = typingTests.filter((test) => test.time === time);
    const totalWpm = filteredTests.reduce((sum, test) => sum + test.wpm, 0);
    const totalAccuracy = filteredTests.reduce(
      (sum, test) => sum + (test.accuracy ?? 0),
      0
    );
    const count = filteredTests.length;
    return {
      averageWpm: count ? (totalWpm / count).toFixed(0) : "N/A",
      averageAccuracy: count ? (totalAccuracy / count).toFixed(0) : "N/A",
    };
  };

  const averages15 = calculateAverages(15);
  const averages30 = calculateAverages(30);
  const averages60 = calculateAverages(60);

  return (
    <>
      <div className="w-1/2 mr-20">
        <h2 className="text-left text-2xl font-semibold py-4 text-[#b0b3c8]">
          {t("stats.average.averageWpmAccuracy")}
        </h2>
        <div className="bg-[#2a2d40] rounded-b-lg shadow-lg overflow-hidden rounded-t-lg">
          <table className="w-full table-auto text-center text-lg">
            <thead>
              <tr className="bg-[#3b3f5c] text-[#b0b3c8]">
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  {t("stats.average.seconds15")}
                </th>
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  {t("stats.average.seconds30")}
                </th>
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  {t("stats.average.seconds60")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#393d56] transition duration-200">
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {averages15.averageWpm} WPM
                </td>
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {averages30.averageWpm} WPM
                </td>
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {averages60.averageWpm} WPM
                </td>
              </tr>
              <tr className="hover:bg-[#393d56] transition duration-200">
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {averages15.averageAccuracy}%
                </td>
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {averages30.averageAccuracy}%
                </td>
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {averages60.averageAccuracy}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AverageStats;
