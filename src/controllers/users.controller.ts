import { Request, Response } from 'express';
import { User } from '../database/models/User';

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find({
			select: {
                id: true,
				email: true,
				is_active: true,
				created_at: true,
			},
		});

		res.json({
			success: true,
			message: 'All the users getted succesfully',
			data: users,
		});
	} catch (error) {}
};

export const getUserFavouritesBooks = async (req: Request, res: Response) => {
	try {
		//1. Recuperar el id del usuario que hace la petición a través del token
		const userId = req.tokenData.id;
		await User.findOne({
			select: {
				id: true,
				email: true,
			},
			where: {
				id: userId,
			},
			relations: {
				favourite_books: true,
			},
		});
		res.json({
			succes: true,
			message: 'Favourite books retrieved',
			data: getUserFavouritesBooks,
		});
	} catch (error) {
		res.status(500).json({
			succes: false,
			message: 'Error retrieving favourite books',
			error: error,
		});
	}
};

export const getUserProfile = async (req: Request, res: Response) => {
	try {
		//1. Get info
		const userId = req.tokenData.id;

		//2. Find the user responding ot the token

		const user = await User.findOne({
			where: { id: userId },
		});

		//3. Return response

		res.json({
			success: true,
			message: 'User profile retrived',
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error retriving profile',
			error: error,
		});
	}
};

export const updateUserProfile = async (req: Request, res: Response) => {
	try {
		const { name, email } = req.body;
		const id = req.tokenData.id;
		const fieldsToUpdate: { name?: string; email?: string } = {};

		if (name) {
			fieldsToUpdate.name = name;
		}
		if (email) {
			fieldsToUpdate.email = email;
		}

		const userUpdated = await User.update(
			{
				id: id,
			},
			fieldsToUpdate,
		);
		res.json({
			success: true,
			message: 'Profile updated',
			data: userUpdated,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error updating profile',
			error: error,
		});
	}
};
