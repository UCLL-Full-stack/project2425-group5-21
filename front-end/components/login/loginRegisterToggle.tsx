import React, { useState } from "react";
import UserLoginForm from "@/components/login/userLoginForm";
import RegisterForm from "@/components/register/userRegisterForm";
import { useTranslation } from "next-i18next";

const LoginRegisterToggle: React.FC = () => {
  const { t } = useTranslation("common");

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setIsLogin(true)}
          className={`py-2 px-10 rounded-md ${
            isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          {t("login.register.button.login")}
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`py-2 px-10 rounded-md ${
            !isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          {t("login.register.button.register")}
        </button>
      </div>
      {isLogin ? <UserLoginForm /> : <RegisterForm />}
    </div>
  );
};

export default LoginRegisterToggle;
