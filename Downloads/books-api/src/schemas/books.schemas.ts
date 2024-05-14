import { z } from "zod";


export const bookSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    pages: z.number().min(1),
    category: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const bookCreateSchema = bookSchema.pick({
    name: true,
    pages: true,
    category: true,
})

export const bookUpdateSchema = bookSchema.partial();

export const bookArraySchema = bookSchema.array();