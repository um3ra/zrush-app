"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales } from "../lib/locales";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useOutside } from "../lib/hooks";
import { motion } from "framer-motion";

export const LocaleSwitcher = () => {
    const locale = useLocale();
    const { isShow, setIsShow, ref } = useOutside<HTMLDivElement>(false);
    const path = usePathname();
    const { replace } = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSelect = (newLocale: string) => {
        const newPath = path.replace(locale, newLocale);
        startTransition(() => {
            replace(`${newPath}`);
        });
        setIsShow(false);
    };

    return (
        <div ref={ref} className="relative text-2xl font-bold">
            <button
                className="relative flex items-center mx-auto disabled:opacity-70"
                onClick={() => setIsShow(!isShow)}
                disabled={isPending}
            >
                {locale}{" "}
                <ChevronDown
                    className={clsx("transition", isShow && "rotate-180")}
                    size={30}
                />
            </button>
            {isShow && (
                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.5
                    }}
                    className="cursor-pointer rounded-md bottom-full w-2/3 left-1/2 -translate-x-1/2 absolute bg-primary"
                >
                    {locales.map((el) => (
                        <li
                            className="hover:bg-background/50 text-background transition"
                            onClick={() => {
                                handleSelect(el);
                            }}
                            key={el}
                        >
                            {el}
                        </li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
};
