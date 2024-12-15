import { useState, useEffect } from "react";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";
import { User } from "@/types";

const UpdateUsername: React.FC<{ user: User }> = ({ user }) => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

  const handleUsernameChange = async () => {
    if (newUsername.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (user && user.id !== undefined) {
      try {
        const response = await UserService.updateUsername(user.id, newUsername);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`${errorData.status}: ${errorData.message}`);
        }

        localStorage.removeItem("loggedInUser");

        setStatusMessage(
          "Username has been updated. Redirecting to login page..."
        );
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (err: any) {
        setError(err.message || "Failed to update username.");
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
        Change name
      </button>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
          <div className="bg-[#2a2d40] p-7 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-4">Change Username</h2>
            <input
              type="text"
              value={newUsername}
              onChange={handleInputChange}
              className="mb-4 p-2 border rounded w-full"
              placeholder="Enter new username"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUsernameChange}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Change name
              </button>
            </div>
            {!error && (
              <p className="mt-4 text-[12px] font-bold text-gray-400">
                Please log in again with your new username.
              </p>
            )}
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
