import { AnyZodObject, z } from "zod";
import { bookArraySchema, bookCreateSchema, bookSchema, bookUpdateSchema } from "../schemas/books.schemas";

export type TBook = z.infer<typeof bookSchema>;

export type TCreateBody = z.infer<typeof bookCreateSchema>;

export type TUpdateBody = z.infer<typeof bookUpdateSchema>;

export type TBookArray = z.infer<typeof bookArraySchema>;

export interface IValidateRequest {
    params?: AnyZodObject;
    body?: AnyZodObject;
    query?: AnyZodObject;
}