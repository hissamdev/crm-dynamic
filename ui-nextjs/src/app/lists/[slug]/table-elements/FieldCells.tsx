import { actionColUpdate } from "@/src/app/actions/operations";
import { Field } from "@/src/utils/types/appTypes";
import React, { RefObject, SetStateAction } from "react";

type Props = {
    fields: Field[];
    setFields: React.Dispatch<SetStateAction<Field[]>>;
    listId: string;
    timersRef: RefObject<Record<string | number, NodeJS.Timeout>>;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
};

export default function FieldCells({
    fields,
    listId,
    timersRef,
    setFields,
    setLoading,
}: Props) {
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
            await actionColUpdate(fieldId, listId, value);
            setLoading(false);
        }, 500);
    };

    const handleColDelete = async (fieldId: string) => {
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
        <thead>
            <tr className="border border-gray-700">
                {fields
                    .filter((field) => !field.deleted)
                    .map((field) => (
                        <th key={field.id}>
                            <div className="min-w-52 text-left border-l border-gray-700 flex">
                                <input
                                    value={field.emoji || ""}
                                    className="border"
                                />
                                <input
                                    onChange={(e) =>
                                        handleColChange(
                                            field.id,
                                            e.target.value,
                                        )
                                    }
                                    type="text"
                                    value={field.name}
                                    className="py-1 hover:bg-white/3"
                                />
                            </div>
                        </th>
                    ))}
            </tr>
        </thead>
    );
}
