import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

type Body = {
    listId: string;
    position: number;
};

const listIdSchema = z.string();
const positionSchema = z.number();

export async function POST(req: NextRequest) {
    console.log("Column creation started");
    const listId = req.nextUrl.searchParams.get("listId");
    const position = Number(req.nextUrl.searchParams.get("position"));

    if (!listId || !position) {
        console.error("Invalid request\n", listId, "\n", position);
        return NextResponse.json({
            success: false,
            message:
                "Invalid request, query string should include listId and pos",
        });
    }

    const safeListId = listIdSchema.safeParse(listId);
    if (!safeListId.success) {
        console.error(safeListId.error.issues);
        return NextResponse.json({
            success: false,
            message: "Validation error",
            error: safeListId.error.issues,
        });
    }

    const safePosition = positionSchema.safeParse(position);
    if (!safePosition.success) {
        console.error(safePosition.error.issues);
        return NextResponse.json({
            success: false,
            message: "Validation error",
            error: safePosition.error.issues,
        });
    }

    try {
        const res = await prisma.field.create({
            data: {
                name: "",
                emoji: "",
                type: "text",
                position: safePosition.data,
                listId: safeListId.data,
            },
        });

        if (!res.id) {
            return NextResponse.json({
                success: false,
                message: "Creation failed, id returned falsy",
            });
        }

        console.log("Column creation successful\n", res.id);

        return NextResponse.json(res);
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}
