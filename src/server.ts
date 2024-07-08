import 'dotenv/config';
import express from 'express';
import { createAuthor, deleteAuthorById, updateAuthorById, getAllAuthors } from './controllers/author.controller'
import { createBooks, updateBookById, deleteBookById, getAllBooks } from './controllers/books.controller';
import { getAllUsers, getUserFavouritesBooks, getUserProfile } from './controllers/users.controller';
import { login, register } from './controllers/auth.controller'
import { AppDataSource } from './database/db';
import { auth } from './middlewares/auth';
import { isAdmin } from './middlewares/isAdmin';
const app = express();
//middleware
app.use(express.json())
const PORT = process.env.PORT || 4000
app.get('/healthy', (req, res) => {
  // res.send('Server is healthy');
  res.status(200).json(
    {
      success: true,
      message: 'Server is Healthy'
    }
  )
})
//  AUTHORS
app.post('/authors', auth, createAuthor)
// rutas dinamincas usamos req params
app.put('/authors/:id', updateAuthorById)
app.delete('/authors/:id', deleteAuthorById)
app.get('/authors', auth, getAllAuthors)
// BOOKS
app.get('/books', )
app.post('/books', auth, createBooks)
app.put('/books', )
app.delete('/books', )
// USER
app.get('/user', auth, isAdmin, getAllUsers);
app.get('/users/myprofile', auth, getUserProfile);
app.get('/users/favourites', auth, getUserFavouritesBooks)
// AUTH
app.post('/register', register)
app.post('/login', login)
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error)
  })



