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
exports.deleteAuthorById = exports.updateAuthorById = exports.getAllAuthors = exports.createAuthor = void 0;
const Author_1 = require("../database/models/Author");
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Recuperar la informacion de la req
        const name = req.body.name;
        const nationality = req.body.nationality;
        // 2. Validar informacion
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is required"
            });
        }
        if (!nationality) {
            return res.status(400).json({
                success: false,
                message: "nationality is required"
            });
        }
        // 3. Tratar información si es necesario
        // 4. Atacar a la bd
        const newAuthor = yield Author_1.Author.create({
            name: name,
            nationality: nationality
        }).save();
        // 5. Responder
        res.json({
            success: true,
            message: 'Author created successfully',
            data: newAuthor
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating author"
        });
    }
});
exports.createAuthor = createAuthor;
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Recuperar la info de la BD
        const authors = yield Author_1.Author.find();
        // 2. Responder la info de la bd
        res.json({
            success: true,
            message: "All authors retrieved successfully",
            data: authors
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Cant retrieve authors",
            error: error
        });
    }
});
exports.getAllAuthors = getAllAuthors;
const updateAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Recupera la info
        const authorIdToUpdate = req.params.id;
        const body = req.body;
        // 2. validar la info
        // 3. trata la info
        // 4. Actualizar en bd
        const authorUpdated = yield Author_1.Author.update({
            id: parseInt(authorIdToUpdate)
        }, body);
        // 5. Responder
        res.status(200).json({
            success: true,
            message: "Auhtor updated",
            data: authorUpdated
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "author cant be updated",
            error: error
        });
    }
});
exports.updateAuthorById = updateAuthorById;
const deleteAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Recuperar id
        const authorIdToDelete = Number(req.params.id);
        // 2. Eliminar registro de la bd
        const authorDeleted = yield Author_1.Author.delete(authorIdToDelete);
        if (!authorDeleted.affected) {
            return res.status(404).json({
                success: false,
                message: "Author doesnt exist"
            });
        }
        // 3. Responder
        res.status(200).json({
            success: true,
            message: "author deleted successfully",
            data: authorDeleted
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting author",
            error: error
        });
    }
});
exports.deleteAuthorById = deleteAuthorById;
