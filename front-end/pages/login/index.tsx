import Head from "next/head";
import Header from "@/components/header";
import LoginRegisterToggle from "@/components/login/loginRegisterToggle";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PredefinedUsers from "@/components/users/predefinedUsers";
import React from "react";

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app.title.login")}</title>
        <meta name="description" content="Login to start playing!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
        <main className="min-h-screen bg-[#120e17] flex flex-col items-center text-white relative pt-10">
          <PredefinedUsers />
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center z-0" />
        <section className="z-10 w-full max-w-5xl flex flex-col items-center justify-center space-y-8 px-6 py-10">
          <LoginRegisterToggle />
        </section>
      </main>
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

export default Login;
