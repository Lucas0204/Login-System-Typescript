import { Request, Response } from 'express'
import { SignUpService } from './signUpService'

class SignUpController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const signUpService = new SignUpService(req.body)

        try {
            const user = await signUpService.execute()
            return res.json(user)
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { SignUpController }
