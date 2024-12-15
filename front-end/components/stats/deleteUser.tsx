import { useState, useEffect } from "react";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";
import { User } from "@/types";

const DeleteUser: React.FC<{ userId: number }> = ({ userId }) => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
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

      setStatusMessage(
        "User has been successfully deleted. Redirecting to login page..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to delete user.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsRemoving(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
      {isRemoving && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
          <div className="bg-[#2a2d40] p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-4">Delete User</h2>
            <p className="mb-4">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsRemoving(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete
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
