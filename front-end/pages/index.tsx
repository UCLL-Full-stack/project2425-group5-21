import React from "react";
import Head from "next/head";
import Header from "@/components/header";

import HomePage from "@/components/home/homePage";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>MR Typer | Home</title>
        <meta
          name="description"
          content="Select your game mode to start playing!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <HomePage />
    </>
  );
};

export default Home;
