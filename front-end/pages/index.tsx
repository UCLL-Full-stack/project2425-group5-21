import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { Globe, User } from "@geist-ui/icons";

const Home: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(10);
  const router = useRouter();

  useEffect(() => {
    if (queuePosition !== null && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (countdown === 0) {
      router.push("/multiplayer");
    }
  }, [queuePosition, countdown, router]);

  const handleGameModeSelection = (mode: "singleplayer" | "multiplayer") => {
    try {
      if (mode === "singleplayer") {
        router.push("/singleplayer");
      } else {
        setQueuePosition(1);
        setCountdown(10);
      }
    } catch (err) {
      setError("Something went wrong while selecting the mode.");
    }
  };

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

      <main className="h-screen bg-[#120e17] flex flex-col justify-center items-center text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center z-0" />

        <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center space-y-8 px-6 py-10">
          <h1 className="text-5xl font-extrabold mb-4 text-center">
            Welcome to MR Typer!
          </h1>
          <p className="text-lg text-center max-w-3xl mb-8">
            Choose your game mode to start typing! Whether you want to play solo
            or with friends, the fun begins here. Let’s see how fast you can
            type!
          </p>

          <div className="flex space-x-8 justify-center mb-8 w-full">
            <div
              onClick={() => handleGameModeSelection("singleplayer")}
              className="bg-[#5ac4d7] text-[#1a1d2e] py-10 px-12 rounded-xl text-3xl font-semibold shadow-xl transform transition-transform hover:scale-105 hover:bg-[#49a8b8] cursor-pointer w-full max-w-xs text-center flex flex-col items-center justify-center hover:shadow-2xl"
            >
              <div className="h-24 w-24 bg-[#49a8b8] rounded-full mb-4 flex items-center justify-center transition-transform hover:scale-110">
                <User className="h-16 w-16 text-[#1a1d2e]" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Singleplayer</h3>
              <p className="text-sm mt-2">
                Play solo and challenge yourself to improve your typing skills.
              </p>
            </div>

            <div
              onClick={() => handleGameModeSelection("multiplayer")}
              className="bg-[#5ac4d7] text-[#1a1d2e] py-10 px-12 rounded-xl text-3xl font-semibold shadow-xl transform transition-transform hover:scale-105 hover:bg-[#49a8b8] cursor-pointer w-full max-w-xs text-center flex flex-col items-center justify-center hover:shadow-2xl"
            >
              <div className="h-24 w-24 bg-[#49a8b8] rounded-full mb-4 flex items-center justify-center transition-transform hover:scale-110">
                <Globe className="h-16 w-16 text-[#1a1d2e]" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Multiplayer</h3>
              <p className="text-sm mt-2">
                Compete with friends or players around the world in real-time!
              </p>
            </div>
          </div>

          {queuePosition !== null && (
            <div className="bg-[#49a8b8] text-[#1a1d2e] rounded-xl p-6 w-full max-w-md text-center shadow-lg">
              <h2 className="text-2xl font-bold mb-4">You are in the queue!</h2>
              <p className="text-lg">Position: {queuePosition}</p>
              <p className="text-lg">Time remaining: {countdown} seconds</p>
            </div>
          )}

          {error && (
            <p className="text-red-400 font-semibold text-xl mt-4">{error}</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
