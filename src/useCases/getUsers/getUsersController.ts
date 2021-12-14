import { Request, Response } from 'express'
import { GetUsersService } from './getUsersService'

class GetUsersController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const getUsersService = new GetUsersService()

        try {
            const users = await getUsersService.execute()
            return res.json(users)
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { GetUsersController }
