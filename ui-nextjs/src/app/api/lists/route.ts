import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await prisma.list.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                fields: {
                    orderBy: {
                        position: "asc",
                    },
                },
            },
        });

        if (res.length === 0) {
            return NextResponse.json(
                {
                    success: true,
                    message: "No lists found",
                    data: [],
                },
                { status: 200 },
            );
        }

        return NextResponse.json(res);
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            success: false,
            message: "Failed to query lists",
            error: err,
        });
    }
}
