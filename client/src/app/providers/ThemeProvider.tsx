"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return <NextThemesProvider>{children}</NextThemesProvider>;
};
