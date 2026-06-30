import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const listIdSchema = z.string();

export async function DELETE(req: NextRequest) {
    const listId = req.nextUrl.searchParams.get("listId");

    if (!listId) {
        console.error("Invalid request");
        return NextResponse.json(
            {
                success: false,
                message: "No listId received",
            },
            { status: 400 },
        );
    }

    const safeListId = listIdSchema.safeParse(listId);
    if (!safeListId.success) {
        console.error(safeListId.error.issues);
        return NextResponse.json(
            {
                success: false,
                message: "Validation failed",
                error: safeListId.error.issues,
            },
            { status: 400 },
        );
    }

    try {
        await prisma.list.delete({
            where: { id: safeListId.data },
        });

        return NextResponse.json(
            {
                success: true,
                message: "List deleted successfully",
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
