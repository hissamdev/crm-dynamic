"use server";
import { Field } from "../dashboard/create-list/page";
import { prepareFields } from "@/src/utils/functions/utility";
import axios, { isAxiosError } from "axios";
import { fieldSchema, listSchema } from "@/src/utils/types/zodTypes";
import z from "zod";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

const signInSchema = z.object({
    email: z.email(),
    terms: z.string("yes"),
});
export async function actionLinkSignIn(initialState: any, formData: FormData) {
    const safeDetails = signInSchema.safeParse({
        email: formData.get("email"),
        terms: formData.get("terms"),
    });

    if (!safeDetails.success) {
        console.error(safeDetails.error.issues);
        return {
            success: false,
            message: "Failed to validate fields",
        };
    }

    try {
        const data = await auth.api.signInMagicLink({
            body: {
                email: safeDetails.data.email,
                callbackURL: "/dashboard",
            },
            headers: await headers(),
        });
        if (!data) {
            return {
                success: false,
                message: "Sign in operation failed",
            };
        }
        return {
            success: true,
            message: "Sign in operation completed successfully",
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Failed to sign in",
        };
    }
}

export async function handleCreateList(fields: Field[], formData: FormData) {
    const listInfo = {
        name: formData.get("list-name"),
        emoji: formData.get("list-emoji"),
        desc: formData.get("list-desc"),
    };

    // Validation
    const safeList = listSchema.safeParse(listInfo);
    if (!safeList.success) {
        console.error(safeList.error.issues);
        return;
    }
    const safeField = fieldSchema.safeParse(fields);
    if (!safeField.success) {
        console.error(safeField.error.issues);
        return;
    }

    // Temporarily ignore until UI dummy data is removed
    // @ts-ignore
    const readyFields = prepareFields(safeField.data);

    const listWithFields = {
        ...safeList.data,
        fields: readyFields,
    };

    try {
        await axios.post(`${process.env.API_URL}/api/lists/create`, {
            listWithFields,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err.response?.status);
            console.error(err.response?.data);
        }
        console.error("Failed to create list:", err);
    }
}
