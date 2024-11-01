const getAllLeaderboards = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/leaderboards", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    });
};

const LeaderboardService = {
    getAllLeaderboards,
};

export default LeaderboardService;
