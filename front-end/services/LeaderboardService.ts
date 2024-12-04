const getLeaderboardByType = async (type: number) => {
  const userString = localStorage.getItem("loggedInUser");
  const token = userString ? JSON.parse(userString).token : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboards/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const LeaderboardService = {
  getLeaderboardByType,
};

export default LeaderboardService;
