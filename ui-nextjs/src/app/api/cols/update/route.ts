import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
    listId: z.string(),
    fieldId: z.string(),
    value: z.string(),
});

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const safeBody = schema.safeParse(body);
    if (!safeBody.success) {
        console.error(safeBody.error.issues);
        return NextResponse.json(
            {
                success: false,
                message: "Validation failure",
                error: safeBody.error.issues,
            },
            { status: 400 },
        );
    }
    try {
        await prisma.field.update({
            where: {
                id: safeBody.data.fieldId,
                listId: safeBody.data.listId,
            },
            data: {
                name: safeBody.data.value,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Updated column",
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
