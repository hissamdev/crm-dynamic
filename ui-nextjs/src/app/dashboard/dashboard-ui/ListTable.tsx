"use client";
import { Field, List, Value } from "@/src/utils/types/appTypes";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { actionRowCreate } from "../../actions/operations";

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
    // Example data
    console.log("Our fields", fields);

    const handleRowChange = (rowId: number, label: string, value: string) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === rowId
                    ? {
                          ...row, // id and listId
                          data: {
                              ...row.data, // Other field columns
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
                data: created.data as Record<string, any>,
            },
            ...prev,
        ]);
    };

    const createCol = () => {};

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
                                                  field.name,
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
                                onClick={createCol}
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
                                              onChange={(e) =>
                                                  handleRowChange(
                                                      row.id,
                                                      field.label,
                                                      e.target.value,
                                                  )
                                              }
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
