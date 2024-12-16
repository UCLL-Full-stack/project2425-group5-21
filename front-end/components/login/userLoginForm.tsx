import React, { useState } from "react";
import { useRouter } from "next/router";
import userService from "@/services/UserService";
import { StatusMessage } from "@/types";
import { useTranslation } from "next-i18next";

const UserLoginForm: React.FC = () => {
  const { t } = useTranslation("common");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!username || username.trim() === "") {
      setUsernameError(t("login.register.validate.name"));
      result = false;
    } else if (username.length < 3 || username.length > 50) {
      setUsernameError(t("login.register.validate.namelength"));
    }

    if (!password || password.trim() === "") {
      setPasswordError(t("login.register.validate.password"));
      result = false;
    } else if (password.length < 5) {
      setPasswordError(t("login.register.validate.passwordlength"));
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

    const user = { username, password };
    const response = await userService.loginUser(user);

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
          message: t("login.register.successlogin"),
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
          message: errorData.message || t("general.error"),
          type: "error",
        },
      ]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300"
          >
            {t("login.register.label.username")}
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
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            {t("login.register.label.password")}
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          {t("login.register.button.login")}
        </button>
      </form>
      {statusMessages.map((status, index) => (
        <div
          key={index}
          className={`mt-4 text-center text-lg font-semibold ${
            status.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status.message}
        </div>
      ))}
    </>
  );
};

export default UserLoginForm;
