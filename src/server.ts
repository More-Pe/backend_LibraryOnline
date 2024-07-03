import 'dotenv/config';
import express from 'express';
import { createAuthor, deleteAuthorById, updateAuthorById } from './controllers/auto.controller'
import { createBooks, deleteBookById, getAllBooks, updateBookById } from './controllers/books.controller';
import { getAllUsers } from './controllers/users.controller';
import { AppDataSource } from './database/db';
// import { formatDiagnostic } from 'typescript';


const app = express();

//middleware

app.use(express.json())

const PORT = process.env.port || 4000;

app.get('/healthy', (req, res) => {
    //    res.send('Server is healthy')

    res.status(200).json(
        {
     success: true,
     message: "Server is healthy"
    }
)
})

app.listen(PORT, () => {
    console.log('Server is running.');
})


//AUTHORS entitiy included

app.post('/authors', createAuthor)

app.put('/authors/:id', updateAuthorById);

app.delete('/authors/:id', deleteAuthorById);

//BOOKS entitiy included

app.get('/books', getAllBooks);

app.post('/books', createBooks); 

app.put('/books/:id', updateBookById);

app.delete('/books/:id', deleteBookById);

AppDataSource.initialize()
.then(() => {
console.log('Database connected');
})
.catch(error => {
console.log(error)
})

//USERS entitiy included

app.get('/users',getAllUsers)

// app.put('/users/:id', updateUserById);

app.get('/users', (req, res) => {      //show all users
    res.send('Detalles del perfil')
})

// app.post('/users', createUser);

// app.delete('/users/:id', deleteUserById);

app.post('/users', );

app.get('/users/:id', )

// LOANS entitiy included

app.get('/loans', (req, res) => {
    res.send('Loans list')
})

app.get('/loans/:id', (req, res) => {
    res.send(`Loans of ${req.body.id}`)
})

app.get('/loans/users/current', (req, res) => {
    res.send(`Loans of ${req.body.user}`)
})

app.get('/loans/users/:userId', (req, res) => {
    res.send(`Loans details of ${req.body.user}`)
})

app.post('/loans', (req, res) => {
    res.send(`New Loan`)
})

app.put('/loans/users/id', (req, res) => {
    res.send('Loan update')
})

app.delete('/loans/users/id', (req, res) => {
    res.send('Loans deleted')
})

app.put('/loans/users/return/id', (req, res) => {
    res.send('Loans returned')
})

// AUTHENTICATION entitiy added

app.post('/auth/register', (req,res) => {
   res.send('Register new user')
})

app.post('/auth/login', (req,res) => {
    res.send('Log in')
 })