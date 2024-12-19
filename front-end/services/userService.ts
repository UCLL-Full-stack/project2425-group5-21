import { User } from "@/types";

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const registerUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const updateUsername = (userId: number, newUsername: string) => {
  const userString = localStorage.getItem("loggedInUser");
  const token = userString ? JSON.parse(userString).token : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/username`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username: newUsername }),
  });
};

const deleteUser = (userId: number) => {
  const userString = localStorage.getItem("loggedInUser");
  const token = userString ? JSON.parse(userString).token : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUserById = async (userId: number) => {
  const userString = localStorage.getItem("loggedInUser");
  const token = userString ? JSON.parse(userString).token : null;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllPlayers = async () => {
  const userString = localStorage.getItem("loggedInUser");
  const token = userString ? JSON.parse(userString).token : null;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/players`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const UserService = {
  loginUser,
  registerUser,
  updateUsername,
  deleteUser,
  getUserById,
  getAllPlayers,
};

export default UserService;
