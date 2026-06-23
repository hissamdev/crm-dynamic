"use client";
import { Field, List, Value } from "@/src/utils/types/appTypes";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { actionColCreate, actionRowCreate } from "../../actions/operations";

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

    const handleRowChange = (rowId: number, fieldId: string, value: string) => {
        console.log(fieldId);
        const row = rows.find((row) => row.id === rowId);
        if (!row) {
            return;
        }
        const updatedRow: Value = {
            ...row,
            data: {
                ...row.data,
                [fieldId]: value,
            },
        };

        setRows((prev) =>
            prev.map((row) => (row.id === rowId ? updatedRow : row)),
        );

        // handleRowUpdate(listInfo.id, rowId);
    };

    const handleRowUpdate = (listId: string, rowId: number, data: Value) => {};

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
    };

    const handleCreateRow = async (fields: Field[]) => {
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

    const handleCreateCol = async (listId: string) => {
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
                position: created.position,
            };

            return [...prev, newField];
        });
    };

    return (
        <main className="mx-42 my-12">
            <div className="flex justify-between items-end">
                <button
                    onClick={() => handleCreateRow(fields)}
                    className="px-3 py-1 flex items-center gap-2 cursor-pointer bg-white/20 hover:bg-white/10 active:bg-amber-300/20"
                >
                    <PlusIcon size={18} /> Row
                </button>

                <div>
                    <span className="text-nowrap">{listInfo.name}</span>
                    <span>{loading ? "Saving" : "Saved"}</span>
                </div>
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
                                                  e.target.value,
                                              )
                                          }
                                          type="text"
                                          value={field.name}
                                          className="px-8 py-1 hover:bg-white/3"
                                      />
                                  </th>
                              ))}
                        <th>
                            <button
                                onClick={() => handleCreateCol(listInfo.id)}
                                className="px-3 py-1 flex items-center gap-2 cursor-pointer bg-white/20 hover:bg-white/10 active:bg-amber-300/20"
                            >
                                <PlusIcon size={18} /> Column
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!rows || rows.length === 0
                        ? null
                        : rows.map((row) => (
                              <tr key={row.id}>
                                  {fields.map((field) => (
                                      <td
                                          key={field.id}
                                          className="min-w-52 text-left border border-gray-700"
                                      >
                                          <input
                                              onChange={(e) => {
                                                  console.log("Reached");
                                                  handleRowChange(
                                                      row.id,
                                                      field.id,
                                                      e.target.value,
                                                  );
                                              }}
                                              value={row.data[field.label]}
                                              className="py-2 px-8 w-full hover:bg-white/4"
                                          />
                                      </td>
                                  ))}
                              </tr>
                          ))}
                </tbody>
            </table>
        </main>
    );
}
