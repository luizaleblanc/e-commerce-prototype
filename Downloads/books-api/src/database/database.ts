import { TBook } from "../interfaces/books.interface";

export const booksDatabase: TBook[] = [];

let id = 0;

export const generateBookId = () => {
    id++;
    return id;
}