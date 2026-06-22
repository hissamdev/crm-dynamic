"use server";

import { Field } from "@/src/utils/types/appTypes";
import axios from "axios";

export async function actionRowCreate(fields: Field[], listId: string) {
    const res = await axios.post(`${process.env.API_URL}/api/rows/create`, {
        listId,
        fields,
    });
    const created = res.data;

    console.log("Created row successfully. Returning id:", created.id);
    return { created };
}

export async function actionColCreate() {}
