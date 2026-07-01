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

    const handleEmojiChange = (fieldId: string, newEmoji: string) => {
        setFields((prev) =>
            prev.map((field) =>
                field.id === fieldId
                    ? {
                          ...field,
                          emoji: newEmoji,
                      }
                    : field,
            ),
        );
    };

    return (
        <thead>
            <tr className="border-">
                {fields
                    .filter((field) => !field.deleted)
                    .map((field) => (
                        <th key={field.id} className="border p-2">
                            <div className="min-w-52 text-left border-gray-700 flex items-center justify-start gap-2">
                                <input
                                    onChange={(e) =>
                                        handleEmojiChange(
                                            field.id,
                                            e.target.value,
                                        )
                                    }
                                    value={field.emoji || ""}
                                    className="w-7 aspect-square text-center cursor-pointer bg-white/10 rounded-xs"
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
