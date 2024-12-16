import TypingTestService from "@/services/TypingTestService";
import { useState, useEffect } from "react";
import { TypingTest, User } from "@/types";
import { useRouter } from "next/router";
import AverageStats from "@/components/stats/averageStats";
import HighestStats from "@/components/stats/highestStats";
import DeleteUser from "@/components/stats/deleteUser";
import UpdateUsername from "@/components/stats/updateUsername";
import { useTranslation } from "next-i18next";

const ProfileStats: React.FC = () => {
  const { t } = useTranslation("common");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [typingTests, setTypingTests] = useState<TypingTest[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
      setError(t("unauthorized.stats.error"));
    }
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[#120e17] flex flex-col items-center text-white relative pt-10">
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
                          <UpdateUsername user={user} />
                        </td>
                        <td className="py-6">
                          <DeleteUser userId={user?.id ?? 0} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-11/12 max-w-8xl flex justify-between mb-8">
              <AverageStats />
              <HighestStats />
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
export default ProfileStats;
