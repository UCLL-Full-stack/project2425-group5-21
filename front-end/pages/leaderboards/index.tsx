import Head from "next/head";
import Header from "@/components/header";
import LeaderboardPage from "@/components/leaderboard/leaderboardPage";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Leaderboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
          <title>{t("app.title.leaderboard")}</title>
          <meta name="description" content="check the top ranked players!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <LeaderboardPage />
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Leaderboard;
