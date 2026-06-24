"use server";

import { Field, Value } from "@/src/utils/types/appTypes";
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

export async function actionRowUpdate(
    listId: string,
    rowId: number,
    data: Record<string, string>,
) {
    const res = await axios.put(`${process.env.API_URL}/api/rows/update`, {
        listId,
        rowId,
        data,
    });
}

export async function actionColUpdate(
    fieldId: string,
    listId: string,
    value: string,
) {
    const res = await axios.put(`${process.env.API_URL}/api/cols/update`, {
        listId,
        fieldId,
        value,
    });
}
