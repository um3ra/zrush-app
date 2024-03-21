import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        NXT_URL: process.env.NXT_URL
    },
    rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: process.env.API_URL + "/:path*",
              },
        ];
    }
};

export default withNextIntl(nextConfig);
