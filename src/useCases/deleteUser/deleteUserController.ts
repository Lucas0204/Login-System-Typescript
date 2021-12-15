import { Request, Response } from 'express'
import { DeleteUserSerivce } from './deleteUserService'

class DeleteUserController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const id = req.params.id
        const deleteUserService = new DeleteUserSerivce()

        try {
            await deleteUserService.execute(id)
            return res.json({
                status: 'Ok',
                message: 'User deleted successfully!'
            })
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { DeleteUserController }
