"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

export type Row = {
    id: number;
    listId: number;
    values: Record<string, string>;
};

export default function Dashboard() {
    const listId = 1;

    const [fields, setFields] = useState([
        { id: 1, name: "Name", label: "name", position: 1 },
        { id: 2, name: "Email", label: "email", position: 2 },
        { id: 3, name: "Occupation", label: "occupation", position: 3 },
    ]);
    const [rows, setRows] = useState<Row[]>([
        {
            id: 1,
            listId: 1,
            values: {
                name: "Hissam",
                email: "email@gmail.com",
                occupation: "Developer",
            },
        },
        {
            id: 2,
            listId: 1,
            values: {
                name: "Hissam",
                email: "email@gmail.com",
                occupation: "Developer",
            },
        },
        {
            id: 3,
            listId: 1,
            values: {
                name: "Hissam",
                email: "email@gmail.com",
                occupation: "Developer",
            },
        },
    ]);
    // Example data

    const handleUpdate = (rowId: number, label: string, value: string) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === rowId
                    ? {
                          ...row,
                          values: {
                              ...row.values,
                              [label]: value,
                          },
                      }
                    : row,
            ),
        );
    };

    const handleColUpdate = (
        fieldId: number,
        fieldName: string,
        value: string,
    ) => {
        setFields((prev) =>
            prev.map((field) =>
                field.id === fieldId
                    ? {
                          ...field,
                          name: value,
                      }
                    : field,
            ),
        );
    };

    const createRow = () => {
        setRows((prev) => {
            const values = Object.fromEntries(
                fields.map((field) => [field.label, ""]),
            );

            return [
                {
                    id: prev.length + 1,
                    listId,
                    values,
                },
                ...prev,
            ];
        });
    };

    const createCol = () => {
        setFields((prev) => {
            const newField = {
                id: prev.length + 1,
                name: "",
                label: "",
                position: prev.length + 1,
            };

            return [...prev, newField];
        });
    };

    return (
        <div className=" grid grid-cols-[20rem_1fr]">
            <aside className="px-8 py-12 sticky top-0 h-screen border-r border-r-white/25">
                <span className="border-b border-b-white/25">Lists</span>
            </aside>
            <main className="mx-42 my-12">
                <button
                    onClick={createRow}
                    className="px-3 py-1 flex items-center gap-2 cursor-pointer bg-white/20 hover:bg-white/10 active:bg-amber-300/20"
                >
                    <PlusIcon size={18} /> Row
                </button>
                <table>
                    <thead>
                        <tr className="border border-gray-700">
                            {fields.map((field) => (
                                <th
                                    key={field.id}
                                    className="min-w-52 text-left border-l border-gray-700"
                                >
                                    <input
                                        onChange={(e) =>
                                            handleColUpdate(
                                                field.id,
                                                field.name,
                                                e.target.value,
                                            )
                                        }
                                        type="text"
                                        value={field.name}
                                        className="px-8 py-1 hover:bg-white/10"
                                    />
                                </th>
                            ))}
                            <th>
                                <button
                                    onClick={createCol}
                                    className="px-3 py-1 flex items-center gap-2 cursor-pointer bg-white/20 hover:bg-white/10 active:bg-amber-300/20"
                                >
                                    <PlusIcon size={18} /> Column
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                {fields.map((field) => (
                                    <td
                                        key={field.id}
                                        className="min-w-52 text-left border border-gray-700"
                                    >
                                        <input
                                            onChange={(e) =>
                                                handleUpdate(
                                                    row.id,
                                                    field.label,
                                                    e.target.value,
                                                )
                                            }
                                            value={
                                                row.values[field.label] || ""
                                            }
                                            className="py-2 px-8 w-full hover:bg-white/10"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
