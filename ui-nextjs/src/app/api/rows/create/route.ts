import prisma from "@/src/lib/prisma";
import { Field } from "@/src/utils/types/appTypes";
import { NextResponse } from "next/server";
import z from "zod";

const listIdSchema = z.string();
const fieldApiSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
    }),
);

export async function POST(req: Request) {
    // Create empty data with corresponding fields
    const body = await req.json();
    const { listId, fields }: { listId: string; fields: Field[] } = body;

    const safeListId = listIdSchema.safeParse(listId);
    if (!safeListId.success) {
        console.error("Failed to validate listId");
        return NextResponse.json(
            {
                success: false,
                message: "Invalid listId",
                error: safeListId.error.issues,
            },
            { status: 400 },
        );
    }
    const safeFields = fieldApiSchema.safeParse(fields);
    if (!safeFields.success) {
        console.error("Failed to validate fields");
        return NextResponse.json(
            {
                success: false,
                message: "Invalid fields",
                error: safeFields.error.issues,
            },
            { status: 400 },
        );
    }

    try {
        // Convert field objects into uuid: ""
        const readyFields = Object.fromEntries(
            safeFields.data.map((field) => [[field.id], ""]),
        );

        const created = await prisma.value.create({
            data: {
                listId: safeListId.data,
                data: readyFields,
                createdAt: new Date(),
            },
        });

        if (!created?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Create row query failed",
                },
                { status: 500 },
            );
        }

        return NextResponse.json(created);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create row",
                error: err,
            },
            { status: 500 },
        );
    }
}
