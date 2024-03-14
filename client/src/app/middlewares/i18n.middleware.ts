import createMiddleware from "next-intl/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { localePrefix, locales } from "@/shared/lib/locales";
import { CustomMiddleware } from ".";

export const i18nMiddleware = (middleware: CustomMiddleware) => {
    const intlMiddleware = createMiddleware({
        defaultLocale: "en",
        locales,
        localePrefix
    });

    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const pathname = request.nextUrl.pathname;

        const blackList = ["/api", "/static", "/_next"];
        const whiteList = ["", ...locales];
        const pathFilter =
            !blackList.some((path) => pathname.startsWith(path)) &&
            whiteList.some((path) => pathname.startsWith(path));

        if (pathFilter) {
            return intlMiddleware(request);
        }

        return middleware(request, event, response);
    };
};
