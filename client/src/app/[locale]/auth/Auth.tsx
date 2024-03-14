"use client";

import { LoginForm, RegisterForm } from "@/features/auth";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const t = useTranslations("Form");

    return (
        <div className="flex-container-center text-center text-primary/70">
            <div className="border-2 rounded-lg p-6 border-primary/50 bg-primary/[3%]">
                {isLogin ? <LoginForm /> : <RegisterForm />}

                <div className="mt-5">
                    <a
                        onClick={() => setIsLogin(!isLogin)}
                        className="cursor-pointer"
                    >
                        {t(isLogin ? "login-switch" : "register-switch")}
                    </a>
                </div>
            </div>
        </div>
    );
};
