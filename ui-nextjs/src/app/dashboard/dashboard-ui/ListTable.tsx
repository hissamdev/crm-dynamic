"use client";
import { Field, Value } from "@/src/utils/types/appTypes";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { handleGetTableInfo } from "../../actions/server";
import { actionRowCreate } from "../../actions/operations";

export default function ListTable({ slug }: { slug: string }) {
    const [fields, setFields] = useState<Field[]>([]);
    const [rows, setRows] = useState<Value[]>([]);
    const [loading, setLoading] = useState(false);
    // Example data

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const { list, values } = await handleGetTableInfo(slug);
            setFields(list!.fields);
            console.log("Received fields", list!.fields);
            setRows(() => {
                return values.map((value) => ({
                    id: value.id,
                    listId: value.listId,
                    values: { ...(value.data as Record<string, any>) },
                }));
            });
            setLoading(false);
        };

        load();
    }, []);

    const handleRowChange = (rowId: number, label: string, value: string) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === rowId
                    ? {
                          ...row, // id and listId
                          values: {
                              ...row.values, // Other fields
                              [label]: value,
                          },
                      }
                    : row,
            ),
        );
    };

    const handleColChange = (
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

    const handleCreateRow = async (fields: Field[]) => {
        const { created } = await actionRowCreate(fields, slug);
        if (!created.id) {
            return console.error("Failed to create row");
        }

        setRows((prev) => [
            {
                id: created.id,
                listId: created.listId,
                values: created.data as Record<string, any>,
            },
            ...prev,
        ]);
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
            <main className="mx-42 my-12">
                <div className="flex justify-between items-end">
                    <button
                        onClick={() => handleCreateRow(fields)}
                        className="px-3 py-1 flex items-center gap-2 cursor-pointer bg-white/20 hover:bg-white/10 active:bg-amber-300/20"
                    >
                        <PlusIcon size={18} /> Row
                    </button>

                    <span>{loading ? "Saving" : "Saved"}</span>
                </div>
                <table>
                    <thead>
                        <tr className="border border-gray-700">
                            {fields.length === 0
                                ? null
                                : fields.map((field) => (
                                      <th
                                          key={field.id}
                                          className="min-w-52 text-left border-l border-gray-700"
                                      >
                                          {field.emoji}
                                          <input
                                              onChange={(e) =>
                                                  handleColChange(
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
                                                handleRowChange(
                                                    row.id,
                                                    field.label,
                                                    e.target.value,
                                                )
                                            }
                                            value={row.values[field.label]}
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
