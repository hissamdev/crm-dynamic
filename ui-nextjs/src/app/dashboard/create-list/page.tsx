"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { handleCreateList } from "../../actions/server";

export type Field = {
    id: string;
    name: string;
    type: string;
    emoji: string;
};

export default function CreateList() {
    const [fields, setFields] = useState<Field[]>([
        { id: `field-${Date.now()}`, name: "", type: "", emoji: "" },
    ]);

    const handleFieldChange = (fieldId: string, key: string, value: string) => {
        setFields((prev) =>
            prev.map((field) =>
                field.id === fieldId
                    ? {
                          ...field,
                          [key]: value,
                      }
                    : field,
            ),
        );
    };

    const handleAddField = () => {
        setFields((prev) => {
            const field = {
                id: `field-${Date.now()}`,
                name: "",
                emoji: "",
                type: "",
            };
            return [...prev, field];
        });
    };

    const submitListWithFields = handleCreateList.bind(null, fields);

    // const handleActionSubmit = async (formData: FormData) => {
    //     const listInfo = {
    //         name: formData.get("list-name"),
    //         emoji: formData.get("list-emoji"),
    //         desc: formData.get("list-desc"),
    //     };
    //     if (!listInfo) {
    //         return console.error("Invalid form");
    //     }

    //     await handleCreateList(listInfo, fields);
    // };

    return (
        <div className="grid grid-cols-[20rem_1fr]">
            <aside className="px-8 py-12 sticky top-0 h-screen border-r border-r-white/25">
                <div className="border-b border-b-white/25">
                    <span className="flex gap-2">
                        Lists
                        <button className="h-fit w-fit">
                            <PlusIcon
                                size={18}
                                className="bg-blue-700 rounded-sm hover:bg-blue-700/80 cursor-pointer"
                            />
                        </button>
                    </span>
                </div>
            </aside>
            <main className="mx-30 my-20">
                <h1 className="text-3xl font-semibold">Create a New List</h1>
                <form action={submitListWithFields} className="mt-12">
                    <h2 className="mb-4 text-lg">List info</h2>
                    <label htmlFor="list-name" className="block">
                        Enter list name
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                        <input
                            type="text"
                            name="list-emoji"
                            className="border w-8 h-8 rounded-md"
                        />
                        <input
                            type="text"
                            id="list-name"
                            name="list-name"
                            className="border px-2 py-1 rounded-md"
                            placeholder="Enter a name for your list"
                        />
                    </div>

                    <label htmlFor="list-desc" className="mt-6 block">
                        Create a description
                    </label>
                    <textarea
                        id="list-desc"
                        name="list-desc"
                        className="mt-2 min-w-80 max-w-full border resize"
                    ></textarea>

                    <h2 className="mt-8 mb-4 text-lg">Fields</h2>
                    <label htmlFor="field-name">Enter field info</label>
                    {fields.map((field) => (
                        <div
                            key={field.id}
                            className="mt-2 flex items-center gap-2"
                        >
                            <input
                                type={field.type}
                                onChange={(e) =>
                                    handleFieldChange(
                                        field.id,
                                        "emoji",
                                        e.target.value,
                                    )
                                }
                                value={field.emoji}
                                className="border w-8 h-8 rounded-md"
                            />
                            <input
                                type={field.type}
                                id="field-name"
                                name="field-name"
                                value={field.name}
                                onChange={(e) =>
                                    handleFieldChange(
                                        field.id,
                                        "name",
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Name, Email etc."
                                className="border px-2 py-1 rounded-md"
                            />
                            <input
                                type={field.type}
                                name="field-type"
                                value={field.type}
                                onChange={(e) =>
                                    handleFieldChange(
                                        field.id,
                                        "type",
                                        e.target.value,
                                    )
                                }
                                className="w-20 border px-2 py-1 rounded-md"
                                placeholder="Type"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleAddField}
                        type="button"
                        className="mt-4 flex items-center bg-blue-700 hover:bg-blue-700/80 px-5 py-1 rounded-md cursor-pointer"
                    >
                        Add <PlusIcon size={18} className="translate-x-1" />
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-1 bg-white/10 rounded-md hover:bg-white/5 cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </main>
        </div>
    );
}
