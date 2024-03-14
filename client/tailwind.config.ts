import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background) / <alpha-value>)",
                primary: "hsl(var(--primary) / <alpha-value>)",
                secondary: "hsl(var(--secondary) / <alpha-value>)",
                error: "hsl(var(--error) / <alpha-value>)",
                accent: "hsl(var(--accent-orange) / <alpha-value>)",
                "accent-green": "hsl(var(--accent-green) / <alpha-value>)"
            },
            transitionProperty: {
                DEFAULT: "all"
            },
            transitionDuration: {
                DEFAULT: "200ms"
            },
            transitionTimingFunction: {
                DEFAULT: "ease-in-out"
            }
        }
    }
};
export default config;
