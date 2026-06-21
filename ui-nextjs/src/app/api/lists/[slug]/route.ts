import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z, { success } from "zod";

const schema = z.string();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
) {
    // Slug contains list id (uuid)
    const { slug } = await params;
    const safeSlug = schema.safeParse(slug);
    if (!safeSlug.success) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid URL params",
                error: safeSlug.error.issues,
            },
            { status: 400 },
        );
    }

    try {
        const list = await prisma.list.findFirst({
            where: { id: safeSlug.data },
            include: {
                fields: {
                    orderBy: {
                        position: "asc",
                    },
                },
            },
        });

        if (!list) {
            return NextResponse.json(
                {
                    success: false,
                    message: "List not found",
                },
                { status: 404 },
            );
        }

        const values = await prisma.value.findMany({
            where: { listId: safeSlug.data },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            list,
            values,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: err,
            },
            { status: 500 },
        );
    }
}
