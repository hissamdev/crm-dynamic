import { actionRowUpdate } from "@/src/app/actions/operations";
import { Field, Value } from "@/src/utils/types/appTypes";
import React, { RefObject, SetStateAction } from "react";

type Props = {
    rows: Value[];
    setRows: React.Dispatch<SetStateAction<Value[]>>;
    listId: string;
    fields: Field[];
    timersRef: RefObject<Record<string | number, NodeJS.Timeout>>;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
};

export default function ValueCells({
    rows,
    setRows,
    listId,
    fields,
    timersRef,
    setLoading,
}: Props) {
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

        handleRowUpdate(listId, rowId, updatedRow.data);
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
    return (
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
                                      className="min-w-52 text-left border"
                                  >
                                      <input
                                          onChange={(e) =>
                                              handleRowChange(
                                                  row.id,
                                                  field.id,
                                                  e.target.value,
                                              )
                                          }
                                          value={row.data[field.id]}
                                          className="py-1 px-2 w-full hover:bg-white/4"
                                      />
                                  </td>
                              ))}
                      </tr>
                  ))}
        </tbody>
    );
}
