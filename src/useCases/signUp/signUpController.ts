import { Request, Response } from 'express'
import { SignUpService } from './signUpService'

class SignUpController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const signUpService = new SignUpService(req.body)

        const user = await signUpService.execute()

        return res.json(user)
    }
}

export { SignUpController }
