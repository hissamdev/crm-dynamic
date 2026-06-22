"use server";

import { Field } from "@/src/utils/types/appTypes";
import axios from "axios";

export async function actionRowCreate(fields: Field[], listId: string) {
    const res = await axios.post(`${process.env.API_URL}/api/rows/create`, {
        listId,
        fields,
    });
    const created = res.data;

    return { created };
}

export async function actionColCreate(listId: string, position: number) {
    console.log("Server action values\n", typeof listId, "\n", typeof position);
    const res = await axios.post(
        `${process.env.API_URL}/api/cols/create/`,
        null,
        {
            params: {
                listId,
                position,
            },
        },
    );
    const created: Field = res.data;

    return { created };
}
