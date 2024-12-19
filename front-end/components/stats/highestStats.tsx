import { useState, useEffect } from "react";
import { TypingTest, User } from "@/types";
import TypingTestService from "@/services/TypingTestService";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const HighestStats: React.FC<{ typingTests: TypingTest[] }> = ({ typingTests }) => {
  const { t } = useTranslation("common");

  const calculateHighest = (time: number) => {
    const filteredTests = typingTests.filter((test) => test.time === time);
    if (filteredTests.length === 0) {
      return { highestWpm: "N/A", highestAccuracy: "N/A" };
    }
    const highestTest = filteredTests.reduce((prev, current) =>
      prev.wpm > current.wpm ? prev : current
    );
    return {
      highestWpm: highestTest.wpm,
      highestAccuracy: highestTest.accuracy,
    };
  };

  const highest15 = calculateHighest(15);
  const highest30 = calculateHighest(30);
  const highest60 = calculateHighest(60);

  return (
    <>
      <div className="w-1/2">
        <h2 className="text-left text-2xl font-semibold py-4 text-[#b0b3c8]">
          {t("stats.highest.highestWpmAccuracy")}
        </h2>
        <div className="bg-[#2a2d40] rounded-b-lg shadow-lg overflow-hidden rounded-t-lg">
          <table className="w-full table-auto text-center text-lg">
            <thead>
              <tr className="bg-[#3b3f5c] text-[#b0b3c8]">
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  {t("stats.highest.seconds15")}
                </th>
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  {t("stats.highest.seconds30")}
                </th>
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  {t("stats.highest.seconds60")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#393d56] transition duration-200">
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {highest15.highestWpm} WPM
                </td>
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {highest30.highestWpm} WPM
                </td>
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {highest60.highestWpm} WPM
                </td>
              </tr>
              <tr className="hover:bg-[#393d56] transition duration-200">
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {highest15.highestAccuracy}%
                </td>
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {highest30.highestAccuracy}%
                </td>
                <td className="py-4 font-semibold text-[#d4d7f2] text-[20px]">
                  {highest60.highestAccuracy}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HighestStats;
