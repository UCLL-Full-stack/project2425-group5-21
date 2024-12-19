import React from "react";
import Head from "next/head";
import Header from "@/components/header";
import MultiplayerPage from "@/components/multiplayer/multiplayerPage";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Multiplayer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
        <Head>
            <title>{t("app.title.multiplayer")}</title>
            <meta name="description" content="Courses app"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Header></Header>
        <MultiplayerPage />
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

export default Multiplayer;
