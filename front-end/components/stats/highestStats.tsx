import { useState, useEffect } from "react";
import { TypingTest, User } from "@/types";
import TypingTestService from "@/services/TypingTestService";
import { useRouter } from "next/router";

const HighestStats: React.FC = () => {
  const [typingTests, setTypingTests] = useState<TypingTest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getAllTypingTests = async () => {
    setError(null);
    try {
      const response = await TypingTestService.getTypingTests();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.status}: ${errorData.message}`);
      }
      const typingTests = await response.json();
      setTypingTests(typingTests);
      setUser(typingTests[0].user);
    } catch (err: any) {
      setError(err.message || "Failed to fetch typing tests data");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      setIsAuthenticated(true);
      getAllTypingTests();
    } else {
      setError(
        "You are not authorized to view the stats page. Please login first."
      );
    }
  }, []);

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
          Highest WPM and Accuracy
        </h2>
        <div className="bg-[#2a2d40] rounded-b-lg shadow-lg overflow-hidden rounded-t-lg">
          <table className="w-full table-auto text-center text-lg">
            <thead>
              <tr className="bg-[#3b3f5c] text-[#b0b3c8]">
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  15 seconds
                </th>
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  30 seconds
                </th>
                <th className="py-4 font-semibold tracking-wider text-[15px]">
                  60 seconds
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
