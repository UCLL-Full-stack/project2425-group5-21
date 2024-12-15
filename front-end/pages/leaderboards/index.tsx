import Head from "next/head";
import Header from "@/components/header";
import type { Leaderboard } from "@/types";
import LeaderboardPage from "@/components/leaderboard/leaderboardPage";

const Leaderboard: React.FC = () => {
  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="check the top ranked players!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LeaderboardPage />
    </>
  );
};

export default Leaderboard;
