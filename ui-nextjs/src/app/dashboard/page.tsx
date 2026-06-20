"use client";

import { ApiList, List } from "@/src/utils/types/appTypes";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Row = {
    id: number;
    listId: number;
    values: Record<string, string>;
};

export default function Dashboard() {
    const listId = 1;
    const [lists, setLists] = useState<List[]>([]);
    const [fields, setFields] = useState([
        { id: 1, name: "Name", label: "name", position: 1 },
        { id: 2, name: "Email", label: "email", position: 2 },
        { id: 3, name: "Occupation", label: "occupation", position: 3 },
    ]);
    const [rows, setRows] = useState<Row[]>([]);
    // Example data
    useEffect(() => {
        const load = async () => {
            const res: ApiList = await axios.get(
                `http://localhost:3000/api/lists`,
            );
            console.log("Data", JSON.stringify(res.data, null, 2));
            setLists(res.data);
        };

        load();
    }, []);

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
                <div>
                    {!lists || lists.length === 0 ? (
                        <div></div>
                    ) : lists.length > 0 ? (
                        lists.map((list) => (
                            <Link key={list.id} href="/">
                                {list.name}
                            </Link>
                        ))
                    ) : (
                        <div>Nothing</div>
                    )}
                </div>
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
