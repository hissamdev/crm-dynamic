import { Field } from "@/src/app/lists/create-list/page";

export function prepareFields(fields: Field[]) {
    return fields.map((field, idx) => ({
        name: field.name,
        emoji: field.emoji,
        type: field.type,
        label: field.name.toLocaleLowerCase(),
        position: idx + 1,
    }));
}
