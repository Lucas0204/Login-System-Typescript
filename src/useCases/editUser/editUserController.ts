import { Request, Response } from 'express'
import { EditUserService } from './editUserService'

class EditUserController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { user_id } = req

        const editUserService = new EditUserService(req.body)

        try {
            const updatedUser = await editUserService.execute(user_id)
            return res.json(updatedUser)
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { EditUserController }
