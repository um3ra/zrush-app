import type { Metadata } from "next";
import { useMessages } from "next-intl";
import { Shantell_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "../providers/Providers";
import "./globals.css";

const shantell = Shantell_Sans({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "zrush",
    description:
        "The perfect tool to organize your life and boost productivity."
};

export default function RootLayout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode;
    params: {
        locale: string;
    };
}>) {
    const messages = useMessages();

    return (
        <html lang={locale}>
            <body className={shantell.className}>
                <Providers locale={locale} messages={messages}>
                    {children}
                </Providers>
                <Toaster
                    duration={1500}
                    richColors
                    toastOptions={{
                        style: { backgroundColor: "hsl(var(--primary))" }
                    }}
                />
            </body>
        </html>
    );
}
