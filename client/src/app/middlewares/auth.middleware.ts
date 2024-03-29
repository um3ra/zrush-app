import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from ".";
import { EnumTokens } from "@/shared/api/api-user";
import { DASHBOARD_PAGES } from "@/shared/config/pages-url.config";
import { locales } from "@/shared/lib/locales";

export const authMiddleware = (middleware: CustomMiddleware) => {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const { url, cookies } = request;

        const pathname = request.nextUrl.pathname;

        const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
        const isAuthPage = url.includes("/auth");
        const local = locales.find((el) => pathname.slice(1).startsWith(el));

        if (
            [`/${local}/personal`, `/${local}/auth`]?.some((path) =>
                pathname.startsWith(path)
            )
        ) {
            if (isAuthPage && refreshToken) {
                return NextResponse.redirect(
                    new URL(DASHBOARD_PAGES.HOME, url)
                );
            }

            if (isAuthPage) {
                return middleware(request, event, response);
            }

            if (!refreshToken) {
                return NextResponse.redirect(new URL(`/auth`, url));
            }
        }
        return middleware(request, event, response);
    };
};
