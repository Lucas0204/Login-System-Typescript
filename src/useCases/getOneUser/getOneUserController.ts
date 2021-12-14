import { Request, Response } from 'express'
import { GetOneUserService } from './getOneUserService'

class GetOneUserController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const id = req.params.id
        const getOneUserService = new GetOneUserService()

        try {
            const user = await getOneUserService.execute(id)
            return res.json(user)
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { GetOneUserController }
