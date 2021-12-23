import { Request, Response } from 'express'
import { ForgotPasswordService } from './forgotPasswordService'

class ForgotPasswordController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const forgotPasswordService = new ForgotPasswordService(req.body)
        
        try {
            await forgotPasswordService.execute()

            return res.json({
                status: 'Ok!',
                message: 'An email has been sent to you with the token that will be used to reset your password!'
            })
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { ForgotPasswordController }
