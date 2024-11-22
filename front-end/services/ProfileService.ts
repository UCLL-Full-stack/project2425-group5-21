import { Profile } from "@/types/index.js";

const addProfile = async (profile: {
  role: "player" | "admin";
  avgWPM: number;
  bio: string;
  id: number;
  highestWPM: number;
  startDate: string;
  username: string;
}) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/profiles", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(profile),
  });
};

const ProfileService = {
  addProfile,
};

export default ProfileService;
