"use server";

import prisma from "@/src/lib/prisma";
import { Field } from "../dashboard/create-list/page";
import z from "zod";
import { prepareFields } from "@/src/utils/functions/utility";

export type List = {
    name: FormDataEntryValue | null;
    emoji: FormDataEntryValue | null;
    desc: FormDataEntryValue | null;
};

const listSchema = z.object({
    name: z
        .string()
        .min(2, "List name should be at least 2 characters")
        .max(120, "List name is too long"),
    emoji: z.string().max(20, "Emoji is too long"),
    desc: z.string().min(2, "List description should be at least 2 characters"),
});

const fieldSchema = z.array(
    z.object({
        name: z
            .string()
            .min(1, "Field name should be at least 1 character")
            .max(250, "Field name should be within 250 characters"),
        emoji: z.string().max(20, "Emoji is too long"),
        type: z.string().max(40, "Type is too long"),
    }),
);

export async function handleCreateList(fields: Field[], formData: FormData) {
    const listInfo = {
        name: formData.get("list-name"),
        emoji: formData.get("list-emoji"),
        desc: formData.get("list-desc"),
    };

    // Validation
    const listResult = listSchema.safeParse(listInfo);
    if (!listResult.success) {
        console.error(listResult.error.issues);
        return;
    }
    const fieldResult = fieldSchema.safeParse(fields);
    if (!fieldResult.success) {
        console.error(fieldResult.error.issues);
        return;
    }

    // Temporarily ignore until UI dummy data is removed
    // @ts-ignore
    const preparedFields = prepareFields(fieldResult.data);

    try {
        await prisma.list.create({
            data: {
                name: listResult.data.name,
                desc: listResult.data.desc,
                fields: {
                    create: preparedFields,
                },
            },
        });
    } catch (e) {
        console.error("Failed to create list:", e);
    }
}
