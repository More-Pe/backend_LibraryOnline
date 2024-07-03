import { Request, Response } from "express";
import { User } from "../database/models/User";

export const getAllUsers =  async (req: Request, res: Response) => {
    try {
        const users = await User.find(
            {
                select: {
                    email: true,
                    is_active: true,
                    created_at: true
                }
            }
        )

        res.json(
            {
                success: true,
                message: "All the users getted succesfully",
                data:  users
            }
        )
    } catch (error) {
        
    }
}
