import React from "react";
import { Globe, User } from "@geist-ui/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

const GameSelection: React.FC<{
  mode: "singleplayer" | "multiplayer";
  setQueuePosition: React.Dispatch<React.SetStateAction<number | null>>;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ mode, setQueuePosition, setCountdown, setError }) => {
  const { t } = useTranslation("common");

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleGameModeSelection = () => {
    try {
      if (mode === "singleplayer") {
        router.push("/singleplayer");
      } else {
        setQueuePosition(1);
        setCountdown(10);
      }
    } catch (err) {
      setError(t("general.error"));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const isSingleplayer = mode === "singleplayer";
  const title = isSingleplayer
    ? t("home.game.singleplayer.title")
    : t("home.game.multiplayer.title");
  const description = isSingleplayer
    ? t("home.game.singleplayer.description")
    : t("home.game.multiplayer.description");
  const Icon = isSingleplayer ? User : Globe;

  return (
    <div>
      {isAuthenticated && (
        <div
          onClick={handleGameModeSelection}
          className="bg-[#5ac4d7] text-[#1a1d2e] py-10 px-12 rounded-xl text-3xl font-semibold shadow-xl transform transition-transform hover:scale-105 hover:bg-[#49a8b8] cursor-pointer w-full max-w-xs text-center flex flex-col items-center justify-center hover:shadow-2xl"
        >
          <div className="h-24 w-24 bg-[#49a8b8] rounded-full mb-4 flex items-center justify-center transition-transform hover:scale-110">
            <Icon className="h-16 w-16 text-[#1a1d2e]" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm mt-2">{description}</p>
        </div>
      )}
    </div>
  );
};

export default GameSelection;
