import Head from "next/head";
import Header from "@/components/header";
import ProfileStats from "@/components/stats/profileStats";

const Stats: React.FC = () => {
  return (
    <>
      <Head>
        <title>Stats</title>
        <meta name="description" content="check your stats!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ProfileStats />
    </>
  );
};

export default Stats;
