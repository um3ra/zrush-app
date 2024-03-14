"use client";

import { switchAnimation } from "@/shared/ui/animations";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = ({ addClass }: { addClass?: string }) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div>
            <button
                className={clsx(
                    addClass,
                    "border-2 border-primary flex items-center p-[.17rem] bg-secondary w-24 rounded-full shadow-sm shadow-primary transition",
                    theme === "dark" ? "justify-end" : "justify-start"
                )}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                <motion.div
                    {...switchAnimation}
                    className="rounded-full w-12 h-12 bg-background border-2 border-primary flex justify-center items-center"
                >
                    {theme === "dark" ? (
                        <Moon className="text-primary h-6 w-6" />
                    ) : (
                        <SunMedium className="text-primary h-7 w-7" />
                    )}
                </motion.div>
            </button>
        </div>
    );
};
