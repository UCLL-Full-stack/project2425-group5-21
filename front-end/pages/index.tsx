import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Header from "@/components/header";

const Home: React.FC = () => {

  return (
    <>
      <Head>
        <title>MR Typer | Your favorite typeracer</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen bg-[#120e17] flex flex-col justify-center items-center">
        
      </main>
    </>
  );
};

export default Home;
