import { booksDatabase, generateBookId } from "../database/database";
import { TBook, TCreateBody, TUpdateBody } from "../interfaces/books.interface";

interface IBookServices {
    create(body: TCreateBody): TBook;
    getOne(id: string): TBook;
    update(body: TUpdateBody, id: string): TBook;
    delete(id: string): void;
}

export class BooksServices implements IBookServices {
    create(body: TCreateBody): TBook {
        const date = new Date();

        const newBook: TBook = {
            id: generateBookId(),
            name: body.name,
            pages: body.pages,
            category: body.category,
            createdAt: date,
            updatedAt: date,
        }

        booksDatabase.push(newBook);
        return newBook;
    }

    getMany(query?: string){

        if(query){
            const filteredBooks = booksDatabase.filter(book => book.name.toLowerCase().includes(query.toLowerCase()));
    
            return filteredBooks;
        }

        return booksDatabase;
    }

    getOne(id: string): TBook{
        const book = booksDatabase.find(book => book.id === Number(id)) as TBook;

        return book;
    }

    update(body: TUpdateBody, id: string): TBook{
        const currentCar = booksDatabase.find(book => book.id === Number(id)) as TBook;
        const index = booksDatabase.findIndex(book => book.id === Number(id));

        const date = new Date();

        const newBook = {...currentCar, ...body, updatedAt: date};

        booksDatabase.splice(index, 1, newBook);
        
        return newBook;
    }

    delete(id: string): void{
        const index = booksDatabase.findIndex(book => book.id === Number(id));

        booksDatabase.splice(index, 1);
    }
}