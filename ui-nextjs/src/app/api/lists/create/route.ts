import prisma from "@/src/lib/prisma";
import { listSchema } from "@/src/utils/types/zodTypes";
import { NextRequest, NextResponse } from "next/server";
import z, { success } from "zod";

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
    // body.listWithFields contains an object with the type of listFieldsSchema
    const body = await req.json();
    const safeList = listFieldsSchema.safeParse(body.listWithFields);
    if (!safeList.success) {
        return NextResponse.json(
            {
                success: false,
                message: "Validation failed",
                error: safeList.error.issues,
            },
            { status: 400 },
        );
    }

    try {
        await prisma.list.create({
            data: {
                ...safeList.data,
                fields: {
                    create: safeList.data.fields,
                },
            },
        });

        console.log("Created list successfully");
        return NextResponse.json(
            {
                success: true,
                message: "Created list successfully",
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
