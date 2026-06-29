import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (pathname.startsWith("/lists")) {
        if (!session) {
            return NextResponse.redirect(new URL("/auth/sign-in", req.url));
        }
    }

    if (pathname.startsWith("/auth")) {
        if (session) {
            return NextResponse.redirect(new URL("/lists", req.url));
        }
    }

    if (pathname.startsWith("/api")) {
        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized: User is not authenticated",
                },
                { status: 401 },
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/auth:path*",
        "/dashboard:path*",
        "/api/lists:path*",
        "/api/cols:path*",
        "/api/rows:path*",
    ],
};
