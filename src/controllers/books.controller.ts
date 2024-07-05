import { Request, Response } from "express";
import { Book } from "../database/models/Book";

export const createBooks =  async (req: Request, res: Response) => {
    try {
        //1. Recupero la info a guardar
        const title = req.body.title
        const description = req.body.description
        const authorId = req.body.authorId

        //2. Validar la info

        if(!title || !description || !authorId){
            return res.status(400).json(
                {
                    success: false,
                    message: "Title, description and author are needed"
                }
            )
        }

        //3. Validar si el libro por isbn existe

        //4. Guardar en la DB
       const newBook = await Book.create(
            {
                title: title,
                description: description,
                authorId: authorId
            }
        ).save() //Súper importante poner el save, sino no se guarda!!!!!!

        res.status(201).json(
            {
                success: true,
                message: "Book created"
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error creating book",
                error: error
            }
        )
    }
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.author);
    
    res.json({
        success: true,
        message: 'CREATE BOOK'
       })
}

export const getAllBooks = async (req: Request, res: Response) => {
try {
    //1. Recupero la info
    const books = await Book.find(
        {
            select: {
                title: true,
                description: true,
                author: {
                    name: true
                }
            },
            relations: {
                author: true
            }
        }
    )

    //2. Dar respuesta
    res.json({
        success: true,
        message: "All books retrieved succesfully",
        data: books
    })
    
} catch (error) {
    res.status(500).json(
        {
            success: false,
            message: "Error getting books",
            error: error
        }
    )
}
}

export const updateBookById = (req: Request, res: Response) => {
    console.log(req.params.id);

    res.json({
        success: true,
        message: `BOOK UPDATED with id ${req.params.id}`
       })
}

export const deleteBookById = (req: Request, res: Response) => {
    res.json({
        success: true,
        message: `BOOK DELETED With id: ${req.params.id}`
       })
}