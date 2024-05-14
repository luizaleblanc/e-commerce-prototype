import { NextFunction, Request, Response } from "express";
import { booksDatabase } from "../database/database";
import { AppError } from "../errors/appError";

export class IsBookNameExist{
    static execute(req: Request, res: Response, next: NextFunction){
        const bookFound = booksDatabase.find(book => book.name === req.body.name);
        
        if(bookFound){
           throw new AppError (409, "Book already registered."); 
        }
        next();
    }
}