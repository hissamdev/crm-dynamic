"use server";

import { Field } from "@/src/utils/types/appTypes";
import axios from "axios";
import { headers } from "next/headers";

export async function actionRowCreate(fields: Field[], listId: string) {
    const headerStore = await headers();
    try {
        const res = await axios.post(
            `${process.env.API_URL}/api/rows/create`,
            {
                listId,
                fields,
            },
            {
                headers: {
                    cookie: headerStore.get("cookie") ?? "",
                },
            },
        );
        const created = res.data;

        return { created };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err.config?.url);
            console.log(err.config?.method);
            console.log(err.response?.status);
            console.log(err.response?.headers);
            console.log(err.response?.data);
        } else {
            console.error(err);
        }
    }
}

export async function actionColCreate(listId: string, position: number) {
    const headerStore = await headers();
    try {
        console.log(
            "Server action values\n",
            typeof listId,
            "\n",
            typeof position,
        );
        const res = await axios.post(
            `${process.env.API_URL}/api/cols/create/`,
            null,
            {
                params: {
                    listId,
                    position,
                },
                headers: {
                    cookie: headerStore.get("cookie") ?? "",
                },
            },
        );
        const created: Field = res.data;

        return { created };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err.config?.url);
            console.log(err.config?.method);
            console.log(err.response?.status);
            console.log(err.response?.headers);
            console.log(err.response?.data);
        } else {
            console.error(err);
        }
    }
}

export async function actionRowUpdate(
    listId: string,
    rowId: number,
    data: Record<string, string>,
) {
    const headerStore = await headers();

    try {
        await axios.put(
            `${process.env.API_URL}/api/rows/update`,
            {
                listId,
                rowId,
                data,
            },
            {
                headers: {
                    cookie: headerStore.get("cookie") ?? "",
                },
            },
        );
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err.config?.url);
            console.log(err.config?.method);
            console.log(err.response?.status);
            console.log(err.response?.headers);
            console.log(err.response?.data);
        }
    }
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
