import React from "react";
import Head from "next/head";
import Header from "@/components/header";
import SingleplayerPage from "@/components/singeplayer/singeplayerPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const Singleplayer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app.title.singleplayer")}</title>
        
        <meta name="description" content="Singleplayer typing test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <SingleplayerPage />
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

export default Singleplayer;


