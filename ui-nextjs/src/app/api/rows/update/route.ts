import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
    listId: z.string(),
    rowId: z.number(),
    data: z.record(z.string(), z.string()),
});

export async function PUT(req: NextRequest) {
    // id, listId, data
    const body = await req.json();
    const { listId, rowId, data } = body;
    if (!listId || !rowId || !data) {
        console.error("Invalid request body");
        return NextResponse.json(
            {
                success: false,
                message: "Invalid request",
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
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}
