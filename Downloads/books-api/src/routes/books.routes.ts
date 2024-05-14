import { Router } from "express";
import { BooksControllers } from "../controllers/books.controllers";
import { IsBookIdValid } from "../middlewares/isBookIdValid.middlewares";
import { IsBookNameExist } from "../middlewares/isBookNameExist.middleware";
import { ValidateRequest } from "../middlewares/validateRequest.middleware";
import { bookCreateSchema, bookUpdateSchema } from "../schemas/books.schemas";

export const booksRouter = Router();

const booksControllers = new BooksControllers;

booksRouter.post("/", IsBookNameExist.execute, ValidateRequest.execute({body: bookCreateSchema}), booksControllers.create);
booksRouter.get("/", booksControllers.getMany);
booksRouter.get("/:id", IsBookIdValid.execute, booksControllers.getOne);
booksRouter.patch("/:id", IsBookIdValid.execute, IsBookNameExist.execute, ValidateRequest.execute({body: bookUpdateSchema}),booksControllers.update);
booksRouter.delete("/:id", IsBookIdValid.execute, booksControllers.delete);