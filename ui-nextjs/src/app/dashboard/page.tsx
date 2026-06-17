"use client";

import { useState } from "react";

type Field = {
    id: string;
    label: string;
    position: number;
};

type Row = {
    id: string;
    values: Record<string, string>;
};

export default function CRMTable() {
    // 🔧 pretend these came from DB
    const [fields, setFields] = useState<Field[]>([
        { id: "name", label: "Name", position: 0 },
        { id: "email", label: "Email", position: 1 },
        { id: "company", label: "Company", position: 2 },
    ]);

    const [rows, setRows] = useState<Row[]>([
        {
            id: "1",
            values: {
                name: "Hissam",
                email: "hissam@gmail.com",
                company: "OpenAI",
            },
        },
        {
            id: "2",
            values: {
                name: "Bob",
                email: "bob@gmail.com",
                company: "Google",
            },
        },
    ]);

    // form state (new row being created)
    const [draft, setDraft] = useState<Record<string, string>>({});

    function addRow() {
        setRows((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                values: draft,
            },
        ]);

        setDraft({});
    }

    function moveFieldLeft(index: number) {
        if (index === 0) return;

        const copy = [...fields];
        [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];

        setFields(copy);
    }

    function moveFieldRight(index: number) {
        if (index === fields.length - 1) return;

        const copy = [...fields];
        [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];

        setFields(copy);
    }

    return (
        <div className="p-4 space-y-6">
            {/* 🧠 CREATE ROW FORM */}
            <div className="border p-3 space-y-2">
                <h2 className="font-bold">Add Row</h2>

                {fields.map((field) => (
                    <input
                        key={field.id}
                        placeholder={field.label}
                        value={draft[field.id] || ""}
                        onChange={(e) =>
                            setDraft((prev) => ({
                                ...prev,
                                [field.id]: e.target.value,
                            }))
                        }
                        className="border p-1 block w-full"
                    />
                ))}

                <button
                    onClick={addRow}
                    className="bg-black text-white px-3 py-1"
                >
                    Save Row
                </button>
            </div>

            {/* 📊 TABLE */}
            <table className="border w-full">
                <thead>
                    <tr>
                        {fields.map((field, i) => (
                            <th key={field.id} className="border p-2">
                                <div className="flex items-center gap-2 justify-center">
                                    <span>{field.label}</span>

                                    {/* fake column drag controls */}
                                    <button onClick={() => moveFieldLeft(i)}>
                                        ◀
                                    </button>
                                    <button onClick={() => moveFieldRight(i)}>
                                        ▶
                                    </button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {fields.map((field) => (
                                <td key={field.id} className="border p-2">
                                    {row.values[field.id]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
