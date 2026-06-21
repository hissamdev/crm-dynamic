"use server";

import prisma from "@/src/lib/prisma";
import { Field } from "@/src/utils/types/appTypes";

export async function actionRowCreate(fields: Field[], listId: string) {
    const values = Object.fromEntries(
        fields.map((field) => [[field.label], ""]),
    );

    console.log("Created values \n", values);
    const created = await prisma.value.create({
        data: {
            listId,
            data: values,
            createdAt: new Date(),
        },
    });

    console.log("Created row successfully. Returning id:", created.id);
    return { created };
}
