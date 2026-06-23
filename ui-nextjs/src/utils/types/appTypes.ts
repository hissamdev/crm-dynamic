export type List = {
    id: string;
    name: string;
    emoji: string;
    desc: string;
    createdAt: Date;
    fields: Field[];
};

export type Field = {
    id: string;
    name: string;
    emoji: string | null;
    type: string | null;
    label: string;
    position: number;
    deleted: boolean;
};

export type Value = {
    id: number;
    listId: string;
    data: Record<string, string>;
    // { label: "", label: "" }
};

export type ApiResponse = {
    success: boolean;
    message: boolean;
    error?: any;
};

export type ApiList = ApiResponse & {
    data: List[];
};
