export type List = {
    id: string;
    name: string;
    emoji: string;
    desc: string;
    createdAt: Date;
    fields: Field[];
};

export type Field = {
    name: string;
    emoji: string;
    type: string;
    label: string;
    position: number;
};

export type ApiResponse = {
    success: boolean;
    message: boolean;
    error?: any;
};

export type ApiList = ApiResponse & {
    data: List[];
};
