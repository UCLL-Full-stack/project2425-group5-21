import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

const WelcomeSection = () => {
  const { t } = useTranslation("common");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div>
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        {t("home.title")}
      </h1>
      <p className="text-lg text-center max-w-3xl mb-8">
        {isAuthenticated
          ? t("home.authenticatedMessage")
          : t("home.unauthenticatedMessage")}
      </p>
    </div>
  );
};

export default WelcomeSection;
