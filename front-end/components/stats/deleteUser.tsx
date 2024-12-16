import { useState } from "react";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const DeleteUser: React.FC<{ userId: number }> = ({ userId }) => {
  const { t } = useTranslation("common");

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      const response = await UserService.deleteUser(userId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.status}: ${errorData.message}`);
      }

      localStorage.removeItem("loggedInUser");

      setStatusMessage(t("stats.profile.deleteUser.userDeleted"));

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || t("general.error"));
    }
  };

  return (
    <>
      <button
        onClick={() => setIsRemoving(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        {t("stats.profile.deleteUser.delete")}
      </button>
      {isRemoving && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
          <div className="bg-[#2a2d40] p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-4">
              {t("stats.profile.deleteUser.deleteUser")}
            </h2>
            <p className="mb-4">
              {t("stats.profile.deleteUser.confirmDelete")}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsRemoving(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                {t("stats.profile.deleteUser.cancel")}
              </button>
              <button
                onClick={() => handleDeleteUser()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                {t("stats.profile.deleteUser.delete")}
              </button>
            </div>
            {statusMessage && (
              <p className="mt-2 text-[12px] font-semibold text-green-500">
                {statusMessage}
              </p>
            )}
            {error && <p className="mt-2 text-[12px] text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;
