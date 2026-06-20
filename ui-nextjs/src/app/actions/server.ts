"use server";

import { Field } from "../dashboard/create-list/page";

export type List = {
    name: FormDataEntryValue | null;
    emoji: FormDataEntryValue | null;
    desc: FormDataEntryValue | null;
};

export async function handleCreateList(fields: Field[], formData: FormData) {
    const listInfo = {
        name: formData.get("list-name"),
        emoji: formData.get("list-emoji"),
        desc: formData.get("list-desc"),
    };
    console.log(
        "List info:",
        JSON.stringify(listInfo, null, 2),
        "\n Fields:",
        fields,
    );
}
