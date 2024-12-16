import React from "react";
import { useTranslation } from "next-i18next";

const usernames = ["johndoe", "janetoe", "lindawalker", "karljackson"];

const passwords = [
  "johndoe123",
  "janetoe123",
  "lindawalker123",
  "karljackson123",
];

const roles = ["player", "player", "admin", "moderator"];

const PredefinedUsers: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className="w-11/12 max-w-7xl bg-[#2a2d40] rounded-lg shadow-lg overflow-hidden mt-10">
      <table className="w-full table-auto text-center text-lg">
        <thead>
          <tr className="bg-[#3b3f5c] text-[#b0b3c8]">
            <th className="py-6 font-semibold tracking-wider">
              {t("home.users.username")}
            </th>
            <th className="py-6 font-semibold tracking-wider">
              {t("home.users.password")}
            </th>
            <th className="py-6 font-semibold tracking-wider">
              {t("home.users.role")}
            </th>
          </tr>
        </thead>
        <tbody>
          {usernames.map((username, index) => (
            <tr
              key={username}
              className="hover:bg-[#393d56] transition duration-200"
            >
              <td className="py-6 text-[#d4d7f2] font-medium">{username}</td>
              <td className="py-6 text-[#d4d7f2] font-medium">
                {passwords[index]}
              </td>
              <td className="py-6 text-[#d4d7f2] font-medium">
                {roles[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredefinedUsers;
