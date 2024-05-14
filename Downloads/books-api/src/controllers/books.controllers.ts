import { Request, Response } from "express";
import { BooksServices } from "../services/books.services";
import { booksDatabase } from "../database/database";



interface IBooksControllers{
    create(req: Request, res: Response): Response;
    getMany(req: Request, res: Response): Response;
    getOne(req: Request, res: Response): Response;
    update(req: Request, res: Response): Response;
    delete(req: Request, res: Response): Response;
}

export class BooksControllers implements IBooksControllers{
    create(req: Request, res: Response): Response{
        const booksServices = new BooksServices;

        const create = booksServices.create(req.body);

        return res.status(201).json(create);
    }

    getMany(req: Request, res: Response): Response{
        const bookSearch = req.query.search as string | undefined;

        const booksServices = new BooksServices;
        const getMany = booksServices.getMany(bookSearch)

        return res.status(200).json(getMany);
    }

    getOne(req: Request, res: Response): Response{
        const booksServices = new BooksServices;

        const getOne = booksServices.getOne(req.params.id);

        return res.status(200).json(getOne);
    }

    update(req: Request, res: Response): Response{
        const booksServices = new BooksServices;

        const update = booksServices.update(req.body, req.params.id);

        return res.status(200).json(update);
    }

    delete(req: Request, res: Response): Response{
        const booksServices = new BooksServices;

        booksServices.delete(req.params.id);

        return res.status(204).json();
    }
    
}