"use client";
import { Field, List, Value } from "@/src/utils/types/appTypes";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import {
    actionColCreate,
    actionRowCreate,
    actionRowUpdate,
} from "../../actions/operations";
import FieldCells from "./table-elements/FieldCells";
import ValueCells from "./table-elements/ValueCells";

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

    const handleRowCreate = async (fields: Field[]) => {
        const created = await actionRowCreate(fields, slug);
        if (!created?.id) {
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
        console.log("Function for col creation");
        const created = await actionColCreate(listId, fields.length + 1);
        if (!created?.id) {
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
                        <FieldCells
                            fields={fields}
                            setFields={setFields}
                            listId={listInfo.id}
                            setLoading={setLoading}
                            timersRef={timersRef}
                        />
                        <ValueCells
                            rows={rows}
                            setRows={setRows}
                            listId={listInfo.id}
                            fields={fields}
                            setLoading={setLoading}
                            timersRef={timersRef}
                        />
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
