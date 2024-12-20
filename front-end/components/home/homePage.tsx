import React, { useState, useEffect } from "react";
import PredefinedUsers from "@/components/users/predefinedUsers";
import QueueStatus from "@/components/home/queueStatus";
import GameSelection from "@/components/home/gameSelection";
import WelcomeSection from "@/components/home/welcomeSection";

const HomePage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(10);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[#120e17] flex flex-col items-center text-white relative">
        <div className={`z-10 w-full max-w-5xl flex flex-col items-center justify-center space-y-8 px-6 py-10 ${isAuthenticated ? 'mt-40' : 'mt-80'}`}>
          <WelcomeSection/>
          <div className="flex space-x-8 justify-center mb-8 w-full">
            <GameSelection
                mode="singleplayer"
              setQueuePosition={setQueuePosition}
              setCountdown={setCountdown}
              setError={setError}
            />
            <GameSelection
              mode="multiplayer"
              setQueuePosition={setQueuePosition}
              setCountdown={setCountdown}
              setError={setError}
            />
          </div>

          <QueueStatus
            queuePosition={queuePosition}
            countdown={countdown}
            setCountdown={setCountdown}
          />

          {error && (
            <p className="text-red-400 font-semibold text-xl mt-4">{error}</p>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
