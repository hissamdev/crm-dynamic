"use client";
import { Field, List, Value } from "@/src/utils/types/appTypes";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import {
    actionColCreate,
    actionColUpdate,
    actionRowCreate,
    actionRowUpdate,
} from "../../actions/operations";

type Props = {
    slug: string;
    list: List;
    values: Value[];
};

export default function ListTable({ slug, list, values }: Props) {
    const [listInfo, setListInfo] = useState<List>(list);
    const [fields, setFields] = useState<Field[]>(list.fields);
    const [rows, setRows] = useState<Value[]>(values);
    const [loading, setLoading] = useState(false);

    const timersRef = useRef<Record<number | string, NodeJS.Timeout>>({});

    const handleRowChange = (rowId: number, fieldId: string, value: string) => {
        console.log(fieldId);
        const row = rows.find((row) => row.id === rowId);
        if (!row) {
            return;
        }
        const updatedRow: Value = {
            ...row, // id, listId
            data: {
                ...row.data, // Other fields (name, email)
                [fieldId]: value, // Current field (phone)
            },
        };

        setRows((prev) =>
            prev.map((row) => (row.id === rowId ? updatedRow : row)),
        );

        handleRowUpdate(listInfo.id, rowId, updatedRow.data);
    };

    const handleRowUpdate = (
        listId: string,
        rowId: number,
        data: Record<string, string>,
    ) => {
        setLoading(true);
        if (timersRef.current[rowId]) {
            clearTimeout(timersRef.current[rowId]);
        }

        timersRef.current[rowId] = setTimeout(async () => {
            await actionRowUpdate(listId, rowId, data);
            setLoading(false);
        }, 500);
    };

    const handleColChange = (fieldId: string, value: string) => {
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

        handleColUpdate(fieldId, value);
    };

    const handleColUpdate = (fieldId: string, value: string) => {
        setLoading(true);
        if (timersRef.current[fieldId]) {
            clearTimeout(timersRef.current[fieldId]);
        }

        timersRef.current[fieldId] = setTimeout(async () => {
            await actionColUpdate(fieldId, listInfo.id, value);
            setLoading(false);
        }, 500);
    };

    const handleRowCreate = async (fields: Field[]) => {
        const { created }: { created: Value } = await actionRowCreate(
            fields,
            slug,
        );
        if (!created.id) {
            return console.error("Failed to create row");
        }

        setRows((prev) => [
            {
                id: created.id,
                listId: created.listId,
                data: created.data as Record<string, any>,
            },
            ...prev,
        ]);
    };

    const handleColCreate = async (listId: string) => {
        const { created }: { created: Field } = await actionColCreate(
            listId,
            fields.length + 1,
        );
        if (!created.id) {
            console.error("Failed to create column");
            return;
        }
        setFields((prev) => {
            const newField: Field = {
                id: created.id,
                name: "",
                emoji: "",
                type: "text",
                label: "",
                deleted: false,
                position: created.position,
            };

            return [...prev, newField];
        });
    };

    const handleColDelete = (fieldId: string) => {
        const field = fields.find((field) => field.id === fieldId);
        if (!field) {
            return;
        }
        const deletedRow: Field = {
            ...field,
            deleted: true,
        };

        setFields((prev) => {
            return prev.map((field) =>
                field.id === fieldId ? deletedRow : field,
            );
        });
    };

    return (
        <div className="mt-20 px-20 flex gap-4 overflow-x-auto">
            <div className="overflow-x-auto">
                <div className="header-row mb-4 flex justify-between items-end">
                    <button
                        onClick={() => handleRowCreate(fields)}
                        className="px-3 py-1 flex items-center gap-2 cursor-pointer bg-white/20 hover:bg-white/10 active:bg-amber-300/20"
                    >
                        <PlusIcon size={18} /> Row
                    </button>
                    <div>
                        <span>{loading ? "Saving" : "Saved"}</span>
                    </div>
                </div>
                <div className="overflow-x-auto scrollbar-none">
                    <table>
                        <thead>
                            <tr className="border border-gray-700">
                                {fields
                                    .filter((field) => !field.deleted)
                                    .map((field) => (
                                        <th
                                            key={field.id}
                                            className="min-w-52 text-left border-l border-gray-700"
                                        >
                                            {field.emoji}
                                            <input
                                                onChange={(e) =>
                                                    handleColChange(
                                                        field.id,
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                value={field.name}
                                                className="px-8 py-1 hover:bg-white/3"
                                            />
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {!rows || !rows.length
                                ? null
                                : rows.map((row) => (
                                      <tr key={row.id}>
                                          {fields
                                              .filter((field) => !field.deleted)
                                              .map((field) => (
                                                  <td
                                                      key={field.id}
                                                      className="min-w-52 text-left border border-gray-700"
                                                  >
                                                      <input
                                                          onChange={(e) => {
                                                              console.log(
                                                                  "Reached",
                                                              );
                                                              handleRowChange(
                                                                  row.id,
                                                                  field.id,
                                                                  e.target
                                                                      .value,
                                                              );
                                                          }}
                                                          value={
                                                              row.data[field.id]
                                                          }
                                                          className="py-1 px-2 w-full hover:bg-white/4"
                                                      />
                                                  </td>
                                              ))}
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <button
                    onClick={() => handleColCreate(listInfo.id)}
                    className="mt-12 px-3 py-1 flex items-center gap-2 cursor-pointer bg-white/20 hover:bg-white/10 active:bg-amber-300/20"
                >
                    <PlusIcon size={18} /> Column
                </button>
            </div>
        </div>
    );
}
