import { Request, Response } from "express";
import { Favourite } from "../database/models/Favourite";

export const createFavourite = async (req: Request, res: Response) => {
    try {
      const userId =  req.tokenData.id
      const book_Id = req.body.book_id
      if(!book_Id){
        return res.status(400).json(
            {
                success: false,
                message:" book is requerido",
            }
        )
      }
      const newFavourite = await Favourite.create(
        {
            book_id: book_Id,
            user_id: userId
        }
      ).save()
      res.status(201).json(
        {
            success: true,
            message:" created favourite",
            data: newFavourite
        }
      )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message : "error created favourite",
                error: error
            }
        )
    }
}

export const deleteFavourite = async (req: Request, res: Response) => {
    try {
        //1. REcuperamos el id del favorito
        const favouriteId=req.params.id
        const userId=req.tokenData.id

        //2. Comprobar si este favourite Id existe
        Favourite.findOne(
            {
                where: {
                    id: parseInt(favouriteId),
                    user_id: userId
                }
            }
        )
        //3. Validar la información obtenida
        if (!favouriteId){
            return res.status(400).json(
                {
                    succes: false,
                    message: "Favourite not found"
                }
            )
        }

        const favDeleted = await Favourite.delete(
            {
                id: parseInt(favouriteId)
            }
        )

        res.status(200).json(
            {
                succes: true,
                message: "Favourite deleted succesfully",
                data: favDeleted
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                succes: false,
                message: "Cannot delete favourite book",
                error: error
            }
        )
        
    }
}