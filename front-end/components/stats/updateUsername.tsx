import { useState, useEffect } from "react";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";
import { User } from "@/types";
import { useTranslation } from "next-i18next";

const UpdateUsername: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation("common");

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

  const handleUsernameChange = async () => {
    if (newUsername.length < 3) {
      setError(t("stats.profile.updateUsername.validate.usernameTooShort"));
      return;
    }

    if (user && user.id !== undefined) {
      try {
        const response = await UserService.updateUsername(user.id, newUsername);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`${errorData.status}: ${errorData.message}`);
        }

        setStatusMessage(
          t("stats.profile.updateUsername.validate.usernameUpdated")
        );

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (err: any) {
        setError(err.message || t("general.error"));
        setStatusMessage(null);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
    setError(null);
    setStatusMessage(null);
  };

  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {t("stats.profile.updateUsername.changeName")}
      </button>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
          <div className="bg-[#2a2d40] p-7 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-4">
              {t("stats.profile.updateUsername.changeUsername")}
            </h2>
            <input
              type="text"
              value={newUsername}
              onChange={handleInputChange}
              className="mb-4 p-2 border rounded w-full"
              placeholder={t("stats.profile.updateUsername.enterNewUsername")}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
              >
                {t("stats.profile.updateUsername.cancel")}
              </button>
              <button
                onClick={handleUsernameChange}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                {t("stats.profile.updateUsername.changeName")}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-[12px] font-bold text-red-500">{error}</p>
            )}
            {statusMessage && (
              <p className="mt-2 text-[12px] font-bold text-green-500">
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUsername;
