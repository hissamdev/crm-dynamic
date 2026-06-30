"use server";

import { Field, Value } from "@/src/utils/types/appTypes";
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

        if (!res.data) {
            return;
        }
        const created: Value = res.data;

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
    console.log("Server action for col creation");
    const headerStore = await headers();
    try {
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
    const headerStore = await headers();

    const res = await axios.put(
        `${process.env.API_URL}/api/cols/update`,
        {
            listId,
            fieldId,
            value,
        },
        {
            headers: {
                cookie: headerStore.get("cookie") ?? "",
            },
        },
    );
}
