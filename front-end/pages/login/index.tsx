import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/userLoginForm";

const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>User Login</title>
        <meta name="description" content="Login to start playing!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen bg-[#120e17] flex flex-col justify-center items-center text-white relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center z-0"
          style={{ backgroundImage: "url(/path/to/your-background-image.png)" }}
        />

        <section className="p-6 min-h-screen flex flex-col items-center mt-20">
          <UserLoginForm />
        </section>
      </main>
    </>
  );
};

export default Login;
