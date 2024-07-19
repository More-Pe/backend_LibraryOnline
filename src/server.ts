import 'dotenv/config';
import express from 'express';
import {
	createAuthor,
	deleteAuthorById,
	updateAuthorById,
	getAllAuthors,
} from './controllers/author.controller';
import {
	createBooks,
	updateBookById,
	deleteBookById,
	getAllBooks,
} from './controllers/books.controller';
import {
	getAllUsers,
	getUserFavouritesBooks,
	getUserProfile,
} from './controllers/users.controller';
import { login, register } from './controllers/auth.controller';
import { AppDataSource } from './database/db';
import { auth } from './middlewares/auth';
import { isAdmin } from './middlewares/isAdmin';
import cors from 'cors';

const app = express();

app.use(
	cors({
		origin: 'http://localhost:5173', // request origin URL
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allowed methods in the request
		credentials: true, // allows session cookies from browser to pass through
	}),
);

//middleware
app.use(express.json());
const PORT = process.env.PORT || 4000;
app.get('/healthy', (req, res) => {
	// res.send('Server is healthy');
	res.status(200).json({
		success: true,
		message: 'Server is Healthy',
	});
});
//  AUTHORS
app.post('/authors', auth, createAuthor);
// rutas dinamincas usamos req params
app.put('/authors/:id', auth, isAdmin, updateAuthorById);
app.delete('/authors/:id', auth, isAdmin, deleteAuthorById);
app.get('/authors', auth, getAllAuthors);
// BOOKS
app.get('/books', getAllBooks);
app.post('/books', auth, isAdmin, createBooks);
app.put('/books', auth, isAdmin, updateBookById);
app.delete('/books', auth, isAdmin, deleteBookById);
// USER
app.get('/user', auth, isAdmin, getAllUsers);
app.get('/users/myprofile', auth, getUserProfile);
app.get('/users/favourites', auth, getUserFavouritesBooks);
// AUTH
app.post('/register', register);
app.post('/login', login);
AppDataSource.initialize()
	.then(() => {
		console.log('Database connected');
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
