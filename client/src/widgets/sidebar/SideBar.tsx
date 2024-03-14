"use client";

import { MenuItem } from "@/features/menu/MenuItem";
import { MENU } from "@/features/menu/menu.data";
import { ThemeSwitcher } from "@/features/theme/ThemeSwitcher";
import { usePathname } from "@/shared/lib/locales/navigation";
import { LocaleSwitcher } from "@/shared/ui";
import { Logo } from "@/shared/ui/Logo";
import { sidebarAnimation } from "@/shared/ui/animations";
import { AnimatePresence, motion } from "framer-motion";
import { StepForward } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export const SideBar = () => {
    const [isShow, setIsShow] = useState(true);
    const path = usePathname();

    return (
        <nav className="relative">
            <AnimatePresence initial={false} mode="wait">
                {isShow && (
                    <motion.div
                        {...sidebarAnimation}
                        className="flex truncate h-full flex-col border-r-2 border-secondary rounded-2xl justify-between items-center"
                    >
                        <Logo className="text-xl" />
                        <div className="p-3">
                            {MENU.map((icon, i) => (
                                <MenuItem
                                    isActive={path === icon.link}
                                    key={i}
                                    item={icon}
                                />
                            ))}
                        </div>
                        <div className="text-center">
                            <LocaleSwitcher />
                            <ThemeSwitcher addClass="my-4" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsShow(!isShow)}
                className="absolute z-[300] top-1/2 -translate-y-1/2 left-full p-3 hover:animate-pulse duration-75"
            >
                <StepForward
                    className={clsx(
                        "transition duration-300 text-secondary w-8 h-8",
                        isShow && "rotate-180"
                    )}
                />
            </button>
        </nav>
    );
};
