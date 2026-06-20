import z from "zod";

export const listSchema = z.object({
    name: z
        .string()
        .min(2, "List name should be at least 2 characters")
        .max(120, "List name is too long"),
    emoji: z.string().max(20, "Emoji is too long"),
    desc: z.string().min(2, "List description should be at least 2 characters"),
});

export const fieldSchema = z.array(
    z.object({
        name: z
            .string()
            .min(1, "Field name should be at least 1 character")
            .max(250, "Field name should be within 250 characters"),
        emoji: z.string().max(20, "Emoji is too long"),
        type: z.string().max(40, "Type is too long"),
    }),
);
