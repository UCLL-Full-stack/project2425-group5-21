import React, { useState } from "react";
import { useRouter } from "next/router";
import userService from "@/services/UserService";
import { StatusMessage } from "@/types";
import classNames from "classnames";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"player" | "admin">("player");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!username || username.trim() === "") {
      setUsernameError("Username is required");
      result = false;
    } else if (username.length < 3 || username.length > 50) {
      setUsernameError("The username must be between 3 and 50 characters.");
    }

    if (!email?.trim()) {
      setEmailError("Email is required");
    } else {
      const specificEmailRegex =
        /^[a-zA-Z]+\.[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
      if (!specificEmailRegex.test(email)) {
        setEmailError("The email format is invalid.");
      }
    }

    if (!password || password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    } else if (password.length < 5) {
      setPasswordError("The password must be at least 5 characters long.");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { username, email, password, role };
    const response = await userService.registerUser(user);

    if (response.status === 200) {
      const user = await response.json();
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: user.token,
          username: user.username,
          role: user.role,
        })
      );
      setStatusMessages([
        {
          message: "Registration successful! Redirecting to homepage...",
          type: "success",
        },
      ]);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      const errorData = await response.json();

      setStatusMessages([
        {
          message:
            errorData.message ||
            "An error has occurred. Please try again later.",
          type: "error",
        },
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-300"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md"
        />
        {usernameError && (
          <p className="text-red-500 text-sm mt-1">{usernameError}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md"
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md"
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-300"
        >
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as "player" | "admin")}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md"
        >
          <option value="player">Player</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
      >
        Register
      </button>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-500": type === "error",
                  "text-green-500": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
