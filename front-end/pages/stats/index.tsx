import Head from "next/head";
import Header from "@/components/header";
import { useState, useEffect } from "react";

const Stats: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setError("You are not authorized to view this page. Please login first.");
    }
  }, []);

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
                      WPM
                    </th>
                    <th className="py-4 font-semibold uppercase tracking-wider">
                      Accuracy
                    </th>
                  </tr>
                </thead>
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

export default Stats;
