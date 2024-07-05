"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBookById = exports.getAllBooks = exports.createBooks = void 0;
const Book_1 = require("../database/models/Book");
const createBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //1. Recupero la info a guardar
        const title = req.body.title;
        const description = req.body.description;
        const authorId = req.body.authorId;
        //2. Validar la info
        if (!title || !description || !authorId) {
            return res.status(400).json({
                success: false,
                message: "Title, description and author are needed"
            });
        }
        //3. Validar si el libro por isbn existe
        //4. Guardar en la DB
        const newBook = yield Book_1.Book.create({
            title: title,
            description: description,
            authorId: authorId
        }).save(); //Súper importante poner el save, sino no se guarda!!!!!!
        res.status(201).json({
            success: true,
            message: "Book created"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating book",
            error: error
        });
    }
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.author);
    res.json({
        success: true,
        message: 'CREATE BOOK'
    });
});
exports.createBooks = createBooks;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //1. Recupero la info
        const books = yield Book_1.Book.find();
        //2. Dar respuesta
        res.json({
            success: true,
            message: "All books retrieved succesfully",
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting books",
            error: error
        });
    }
});
exports.getAllBooks = getAllBooks;
const updateBookById = (req, res) => {
    console.log(req.params.id);
    res.json({
        success: true,
        message: `BOOK UPDATED with id ${req.params.id}`
    });
};
exports.updateBookById = updateBookById;
const deleteBookById = (req, res) => {
    res.json({
        success: true,
        message: `BOOK DELETED With id: ${req.params.id}`
    });
};
exports.deleteBookById = deleteBookById;
