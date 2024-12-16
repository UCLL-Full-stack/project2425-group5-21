import Head from "next/head";
import Header from "@/components/header";
import ProfileStats from "@/components/stats/profileStats";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Stats: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app.title.stats")}</title>
        <meta name="description" content="check your stats!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <ProfileStats />
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

export default Stats;
