"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auto_controller_1 = require("./controllers/auto.controller");
const books_controller_1 = require("./controllers/books.controller");
const users_controller_1 = require("./controllers/users.controller");
const db_1 = require("./database/db");
// import { formatDiagnostic } from 'typescript';
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
const PORT = process.env.port || 4000;
app.get('/healthy', (req, res) => {
    //    res.send('Server is healthy')
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});
app.listen(PORT, () => {
    console.log('Server is running.');
});
//AUTHORS entitiy included
app.post('/authors', auto_controller_1.createAuthor);
app.put('/authors/:id', auto_controller_1.updateAuthorById);
app.delete('/authors/:id', auto_controller_1.deleteAuthorById);
//BOOKS entitiy included
app.get('/books', books_controller_1.getAllBooks);
app.post('/books', books_controller_1.createBooks);
app.put('/books/:id', books_controller_1.updateBookById);
app.delete('/books/:id', books_controller_1.deleteBookById);
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
})
    .catch(error => {
    console.log(error);
});
//USERS entitiy included
app.get('/users', users_controller_1.getAllUsers);
// app.put('/users/:id', updateUserById);
app.get('/users', (req, res) => {
    res.send('Detalles del perfil');
});
// app.post('/users', createUser);
// app.delete('/users/:id', deleteUserById);
app.post('/users');
app.get('/users/:id');
// LOANS entitiy included
app.get('/loans', (req, res) => {
    res.send('Loans list');
});
app.get('/loans/:id', (req, res) => {
    res.send(`Loans of ${req.body.id}`);
});
app.get('/loans/users/current', (req, res) => {
    res.send(`Loans of ${req.body.user}`);
});
app.get('/loans/users/:userId', (req, res) => {
    res.send(`Loans details of ${req.body.user}`);
});
app.post('/loans', (req, res) => {
    res.send(`New Loan`);
});
app.put('/loans/users/id', (req, res) => {
    res.send('Loan update');
});
app.delete('/loans/users/id', (req, res) => {
    res.send('Loans deleted');
});
app.put('/loans/users/return/id', (req, res) => {
    res.send('Loans returned');
});
// AUTHENTICATION entitiy added
app.post('/auth/register', (req, res) => {
    res.send('Register new user');
});
app.post('/auth/login', (req, res) => {
    res.send('Log in');
});
