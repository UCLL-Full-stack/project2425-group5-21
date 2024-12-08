import Head from "next/head";
import Header from "@/components/header";
import TypingTestService from "@/services/TypingTestService";
import { useState, useEffect } from "react";
import { TypingTest, User } from "@/types";

const Stats: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [typingTests, setTypingTests] = useState<TypingTest[]>([]);
  const [user, setUser] = useState<User | null>(null);

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
      <Head>
        <title>Stats</title>
        <meta name="description" content="check your stats!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen bg-[#120e17] flex flex-col items-center text-white relative pt-10">
        {isAuthenticated ? (
          <>
            <div className="w-11/12 max-w-8xl mb-8 mt-20">
              <h2 className="text-left text-4xl font-semibold py-4 text-[#b0b3c8]">
                Profile
              </h2>
              <div className="bg-[#2a2d40] rounded-b-lg shadow-lg overflow-hidden rounded-t-lg">
                <table className="w-full table-auto text-center text-lg">
                  <tbody>
                    {user && (
                      <tr className="hover:bg-[#393d56] transition duration-200">
                        <td className="py-6 font-semibold text-[#d4d7f2] text-[30px]">
                          {user.username}
                          <div className="text-[13px] text-[#b0b3c8] mt-1">
                            Joined:{" "}
                            {user.creationDate
                              ? new Date(user.creationDate).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </td>
                        <td className="py-6 font-semibold text-[#d4d7f2] text-[22px]">
                          Tests Completed: {typingTests.length}
                        </td>
                        <td className="py-6 font-semibold text-[#d4d7f2] text-[22px]">
                          Time Typing:{" "}
                          {Math.floor(
                            typingTests.reduce(
                              (sum, test) => sum + (test.time ?? 0),
                              0
                            ) / 60
                          )}{" "}
                          minutes
                        </td>
                        <td className="py-6">
                          <button className="bg-[#4a90e2] hover:bg-[#357ac9] text-white font-bold py-2 px-4 rounded">
                            Update
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-11/12 max-w-8xl flex justify-between mb-8">
              <div className="w-1/2 mr-20">
                <h2 className="text-left text-2xl font-semibold py-4 text-[#b0b3c8]">
                  Average WPM and Accuracy
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

export default Stats;
