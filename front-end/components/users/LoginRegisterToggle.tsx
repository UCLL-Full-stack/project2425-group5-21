import React, { useState } from "react";
import UserLoginForm from "@/components/users/userLoginForm";
import RegisterForm from "@/components/users/userRegisterForm";

const LoginRegisterToggle: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setIsLogin(true)}
          className={`py-2 px-4 rounded-md ${
            isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`py-2 px-4 rounded-md ${
            !isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Register
        </button>
      </div>
      {isLogin ? <UserLoginForm /> : <RegisterForm />}
    </div>
  );
};

export default LoginRegisterToggle;
