import { Request, Response } from 'express'
import { SignInService } from './signInService'

class SignInController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const signInService = new SignInService(req.body)

        try {
            const token = await signInService.execute()
            return res.json({ token })
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { SignInController }
