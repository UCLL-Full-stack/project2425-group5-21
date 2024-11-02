import {Profile} from "@/types";

const getAllLeaderboards = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/leaderboards", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    });
};

const addProfile = async (profile: Profile) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/profiles", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(profile),
    });
};

const LeaderboardService = {
    getAllLeaderboards,
    addProfile,
};

export default LeaderboardService;
