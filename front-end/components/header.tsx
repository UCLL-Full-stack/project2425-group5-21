import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@/types";
import Language from "@/components/language/Language";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation("common");

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  useEffect(() => {
    const userString = localStorage.getItem("loggedInUser");
    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        setLoggedInUser(user);
      } catch (error) {
        console.error("Failed to parse loggedInUser from localStorage:", error);
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="p-4 bg-[#120e17] border-b border-[#e8e6ea]/10 ">
      <div className="mx-auto flex">
        <a
          className="text-2xl font-semibold text-white-50 text-[#e8e6ea]"
          href="#"
        >
          {t("app.title")}
        </a>

        <nav className="flex space-x-6 ml-auto">
          <Link
            href="/"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            {t("header.nav.home")}
          </Link>
          <Link
            href="/stats"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            {t("header.nav.stats")}
          </Link>
          <Link
            href="/leaderboards"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            {t("header.nav.leaderboard")}
          </Link>

          {!loggedInUser && (
            <Link
              href="/login"
              className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
            >
              {t("header.nav.login.register")}
            </Link>
          )}
          {loggedInUser && (
            <a
              href="/login"
              onClick={handleClick}
              className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
            >
              {t("header.nav.logout")}
            </a>
          )}
          {loggedInUser && (
            <div className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
              {t("header.welcome")}, {loggedInUser.username}!
            </div>
          )}

          <Language />
        </nav>
      </div>
    </header>
  );
};

export default Header;
