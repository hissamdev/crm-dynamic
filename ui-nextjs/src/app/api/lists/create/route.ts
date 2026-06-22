import prisma from "@/src/lib/prisma";
import { listSchema } from "@/src/utils/types/zodTypes";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const readyFieldSchema = z.array(
    z.object({
        name: z.string(),
        emoji: z.string(),
        type: z.string(),
        label: z.string(),
        position: z.number(),
    }),
);

export const listFieldsSchema = listSchema.extend({
    fields: readyFieldSchema,
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const safeList = listFieldsSchema.safeParse(body.listWithFields);
    if (!safeList.success) {
        console.error(
            "Failed to validate listWithFields in API route\n",
            safeList.error.issues,
        );
        return NextResponse.json(
            {
                success: false,
                message: "Validation failed",
                error: safeList.error.issues,
                data: body.listWithFields,
            },
            { status: 400 },
        );
    }

    try {
        await prisma.list.create({
            data: {
                name: safeList.data.name,
                emoji: safeList.data.emoji,
                desc: safeList.data.desc,
                fields: {
                    create: safeList.data.fields.map((field) => ({
                        name: field.name,
                        emoji: field.emoji,
                        type: field.type,
                        label: field.label,
                        position: field.position,
                    })),
                },
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Successfully created list with initial fields",
                data: safeList.data,
            },
            { status: 201 },
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
