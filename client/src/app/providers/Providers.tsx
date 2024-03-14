"use client";

import { queryClient } from "@/shared/api/query-client";
import { ThemeProvider } from "./ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

export const Providers = ({
    children,
    locale,
    messages
}: {
    children: React.ReactNode;
    locale: string;
    messages: AbstractIntlMessages;
}) => {
    return (
        <NextIntlClientProvider
            timeZone="Europe/Kiev"
            locale={locale}
            messages={messages as IntlMessages}
        >
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    );
};
