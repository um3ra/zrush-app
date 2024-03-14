"use client";

import { useEffect } from "react";
import { useRouter } from "@/shared/lib/locales";
import { useTranslations } from "next-intl";
import { EnterKeyIcon, Logo } from "@/shared/ui";

export const Home = () => {
    const { push } = useRouter();
    const t = useTranslations("Home");

    const handleClickEnter = (e: globalThis.KeyboardEvent | MouseEvent) => {
        if (
            !(e as globalThis.KeyboardEvent).key ||
            (e as globalThis.KeyboardEvent).key === "Enter"
        ) {
            push("/auth");
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleClickEnter);
        window.addEventListener("click", handleClickEnter);

        return () => {
            window.removeEventListener("keydown", handleClickEnter);
            window.removeEventListener("click", handleClickEnter);
        };
    });

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Logo className="text-5xl" />
            <p className="text-sm">{t("description")}</p>
            <div className="mt-12 flex">
                {t("press-key-enter")}
                <span className="ml-2 animate-bounce">
                    <EnterKeyIcon />
                </span>
            </div>
        </div>
    );
};
