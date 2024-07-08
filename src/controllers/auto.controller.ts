import { Request, Response } from "express";
import { Author } from "../database/models/Author";
export const createAuthor = async (req: Request, res: Response) => {
  try {
    // 1. Recuperar la informacion de la req
    const name = req.body.name;
    const nationality = req.body.nationality;
    // 2. Validar informacion
    if (!name) {
      return res.status(400).json(
        {
          success: false,
          message: "name is required"
        }
      )
    }
    if (!nationality) {
      return res.status(400).json(
        {
          success: false,
          message: "nationality is required"
        }
      )
    }
    // 3. Tratar información si es necesario
    // 4. Atacar a la bd
    const newAuthor = await Author.create(
      {
        name: name,
        nationality: nationality
      }
    ).save();
    // 5. Responder
    res.json(
      {
        success: true,
        message: 'Author created successfully',
        data: newAuthor
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error creating author"
      }
    )
  }
}
export const getAllAuthors = async(req: Request, res: Response) => {
  try {
    // 1. Recuperar la info de la BD
    let limit = Number(req.query.limit) > 100 ? 5 : Number(req.query.limit)//Elige la cantidad de autores que muestra, por defecto son 5
    const page = Number(req.query.page) || 1 //Elige qué página muestra, por defecto la 1
    
    // if(limit>100){
    //   limit=10
    // } Esto es lo mismo que se hizo arriba con la ternaria

    const authors = await Author.find({
      skip: (page-1)*limit,
      take: limit
    })
    // 2. Responder la info de la bd
    res.json(
      {
        success: true,
        message: "All authors retrieved successfully",
        data: authors
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Cant retrieve authors",
        error: error
      }
    )
  }
}
export const updateAuthorById = async (req: Request, res: Response) => {
  try {
      // 1. Recupera la info
      const authorIdToUpdate = req.params.id
      const body = req.body
      // 2. validar la info
      // 3. trata la info
      // 4. Actualizar en bd
      const authorUpdated = await Author.update(
        {
          id: parseInt(authorIdToUpdate)
        },
        body
      )
      // 5. Responder
      res.status(200).json(
        {
          success: true,
          message: "Auhtor updated",
          data: authorUpdated
        }
      )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "author cant be updated",
        error: error
      }
    )
  }
}
export const deleteAuthorById = async (req: Request, res: Response) => {
  try {
    // 1. Recuperar id
    const authorIdToDelete = Number(req.params.id)
    // 2. Eliminar registro de la bd
    const authorDeleted = await Author.delete(authorIdToDelete)
    if(!authorDeleted.affected) {
      return res.status(404).json(
        {
          success: false,
          message: "Author doesnt exist"
        }
      )
    }
    // 3. Responder
    res.status(200).json(
      {
        success: true,
        message: "author deleted successfully",
        data: authorDeleted
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error deleting author",
        error: error
      }
    )
  }
}