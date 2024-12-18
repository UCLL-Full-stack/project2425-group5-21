import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserService from "@/services/UserService";
import Header from "@/components/header";
import { User } from "@/types";

const UserInfoById = () => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const { userId } = router.query;

  const getUserById = async () => {
    const userResponse = await UserService.getUserById(Number(userId));
    const user = await userResponse.json();
    setUser(user);
  };

  useEffect(() => {
    if (userId) getUserById();
  }, [userId]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MR Typer | Leaderboard User Info</title>
        <meta name="description" content="Leaderboard User Info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="min-h-screen bg-[#120e17] flex flex-col items-center text-white py-8">
        <div className="bg-[#1e1b29] shadow-md rounded-lg p-6 w-full max-w-md mt-60">
          <h1 className="text-2xl font-bold mb-4 text-center text-[#49a8b8]">
            User Info
          </h1>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-semibold">ID:</td>
                <td className="py-2">{user.id}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-semibold">Username:</td>
                <td className="py-2">{user.username}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-semibold">Email:</td>
                <td className="py-2">{user.email}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-semibold">Role:</td>
                <td className="py-2">{user.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default UserInfoById;
