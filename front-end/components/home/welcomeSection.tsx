import React, { useState, useEffect } from "react";

const WelcomeSection = () => {
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
        Welcome to MR Typer!
      </h1>
      <p className="text-lg text-center max-w-3xl mb-8">
        {isAuthenticated
          ? "Choose your game mode to start typing! Whether you want to play solo or with friends, the fun begins here. Let’s see how fast you can type!"
          : "If you want to play singleplayer or multiplayer, please login first. If you don't have an account, sign up now to join the fun and improve your typing skills. Challenge yourself, compete with others, and track your progress over time!"}
      </p>
    </div>
  );
};

export default WelcomeSection;
