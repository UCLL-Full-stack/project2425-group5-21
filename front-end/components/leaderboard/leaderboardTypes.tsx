import React from "react";
import { useTranslation } from "next-i18next";

const LeaderboardTypes: React.FC<{
  selectedType: number;
  setSelectedType: React.Dispatch<React.SetStateAction<number>>;
}> = ({ selectedType, setSelectedType }) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center w-11/12 max-w-3xl mt-20">
      <div className="flex h-30 items-center justify-between w-full">
        <h1 className="text-4xl font-extrabold tracking-widest my-8 text-white">
          {t("leaderboard.title")}
        </h1>
        <h1
          onClick={() => setSelectedType(15)}
          className={`text-3xl font-extrabold tracking-widest my-8 cursor-pointer ${
            selectedType === 15 ? "text-[#49a8b8]" : "text-white"
          }`}
        >
          15
        </h1>
        <h1
          onClick={() => setSelectedType(30)}
          className={`text-3xl font-extrabold tracking-widest my-8 cursor-pointer ${
            selectedType === 30 ? "text-[#49a8b8]" : "text-white"
          }`}
        >
          30
        </h1>
        <h1
          onClick={() => setSelectedType(60)}
          className={`text-3xl font-extrabold tracking-widest my-8 cursor-pointer ${
            selectedType === 60 ? "text-[#49a8b8]" : "text-white"
          }`}
        >
          60
        </h1>
      </div>
    </div>
  );
};

export default LeaderboardTypes;
