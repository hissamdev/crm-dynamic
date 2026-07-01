import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
    listId: z.string(),
    rowId: z.number(),
    data: z.record(z.string(), z.string()),
});

type ReqBody = {
    listId: string;
    rowId: number;
    data: Record<string, string>;
};

export async function PUT(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        });
    }
    // id, listId, data
    const body = await req.json();
    const { listId, rowId, data }: ReqBody = body;
    if (!listId || !rowId || !data) {
        console.error("Invalid request body");
        return NextResponse.json(
            {
                success: false,
                message: "Invalid request: Missing fields",
            },
            { status: 400 },
        );
    }

    const safeBody = schema.safeParse(body);
    if (!safeBody.success) {
        return NextResponse.json(
            {
                success: false,
                message: "Validation failed",
                error: safeBody.error.issues,
            },
            { status: 400 },
        );
    }

    try {
        // Check if user has access to the row being updated
        const isUserOwner = await prisma.list.findFirst({
            where: {
                id: listId,
                userId: session.user.id,
            },
        });

        if (!isUserOwner) {
            return NextResponse.json({
                success: false,
                message: "No access to specified list",
            });
        }

        await prisma.value.update({
            where: { id: safeBody.data.rowId, listId: safeBody.data.listId },
            data: {
                data: safeBody.data.data,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Row updated",
            },
            { status: 200 },
        );
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
